import { AuctionLocation, AuctionDeliveryFee, Port, AuctionLocationPort, PortFee } from '../models/index.js';

export const getAuctions = async (req, res) => {
  try {
    const auctions = await AuctionLocation.findAll({ include: [{ model: Port, as: 'port' }] });
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch auction locations' });
  }
};

export const getAuctionDeliveryFees = async (req, res) => {
  try {
    const fees = await AuctionDeliveryFee.findAll();
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch auction delivery fees' });
  }
};

export const updateAuctionDeliveryFee = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const [fee, created] = await AuctionDeliveryFee.upsert({ auctionLocationId: auctionId, ...req.body }, { returning: true });
    res.json(fee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update auction delivery fee' });
  }
};

export const updateAuctionLocation = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { portId } = req.body;
    const auction = await AuctionLocation.findByPk(auctionId);
    if (!auction) return res.status(404).json({ error: 'Auction not found' });
    auction.portId = portId;
    await auction.save();
    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update auction location' });
  }
};


export const upsertAuctionLocationPort = async (req, res) => {
  try {
    const { auctionLocationId, portId } = req.body
    if (!auctionLocationId) return res.status(400).json({ error: 'auctionLocationId required' })

    await AuctionLocationPort.destroy({ where: { auctionLocationId } })

    let row = null
    if (portId) {
      row = await AuctionLocationPort.create({ auctionLocationId, portId })
    }
    res.json({ success: true, row })
  } catch (error) {
    res.status(500).json({ error: 'Failed to upsert auction location port' })
  }
}


export const getAuctionLocationPorts = async (req, res) => {
  try {
    const rows = await AuctionLocationPort.findAll()
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch auction location ports' })
  }
}


export const getAllAuctionPortData = async (req, res) => {
  try {
    const ports = await Port.findAll({
      include: [{ model: PortFee, as: 'fee' }]
    })

    const auctions = await AuctionLocation.findAll({
      include: [{ model: AuctionDeliveryFee, as: 'fee' }]
    })

    const auctionLocationPorts = await AuctionLocationPort.findAll()

    res.json({
      ports,
      auctions,
      auctionLocationPorts
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all auction/port data' })
  }
}

export const bulkCreateAuctions = async (req, res) => {
  try {
    const auctions = req.body;
    if (!Array.isArray(auctions)) {
      return res.status(400).json({ error: 'Array required' });
    }
    for (const auctionData of auctions) {
      if (!auctionData.name || !auctionData.auctionType) continue;

      const [auctionLocation, created] = await AuctionLocation.findOrCreate({
        where: { name: auctionData.name, auctionType: auctionData.auctionType },
        defaults: { name: auctionData.name, auctionType: auctionData.auctionType }
      });

      if (auctionData.port) {
        const [port, portCreated] = await Port.findOrCreate({
          where: { name: auctionData.port },
          defaults: { name: auctionData.port }
        });
        auctionLocation.portId = port.id;
        await auctionLocation.save();
        await AuctionLocationPort.findOrCreate({
          where: { auctionLocationId: auctionLocation.id, portId: port.id },
          defaults: { auctionLocationId: auctionLocation.id, portId: port.id }
        });
      } else {
        auctionLocation.portId = null;
        await auctionLocation.save();
      }

      const carFee = auctionData.fee?.car || 0;
      const suvFee = auctionData.fee?.suv || 0;
      const motoFee = auctionData.fee?.moto || 0;

      await AuctionDeliveryFee.upsert({
        auctionLocationId: auctionLocation.id,
        carFee: carFee,
        suvFee: suvFee,
        motoFee: motoFee
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk create auctions', details: error.message });
  }
};