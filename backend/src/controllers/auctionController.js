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
    for (const auction of auctions) {
      if (!auction.name || !auction.auctionType) continue;
      await AuctionLocation.findOrCreate({
        where: { name: auction.name, auctionType: auction.auctionType },
        defaults: { name: auction.name, auctionType: auction.auctionType }
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk create auctions' });
  }
};