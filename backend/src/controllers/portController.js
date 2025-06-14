import { Port, PortFee } from '../models/index.js';

export const getPorts = async (req, res) => {
  try {
    const ports = await Port.findAll();
    res.json(ports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ports' });
  }
};

export const getPortFees = async (req, res) => {
  try {
    const fees = await PortFee.findAll();
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch port fees' });
  }
};

export const updatePortFee = async (req, res) => {
  try {
    const { portId } = req.params;
    const [fee, created] = await PortFee.upsert({ portId, ...req.body }, { returning: true });
    res.json(fee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update port fee' });
  }
};

export const bulkCreatePorts = async (req, res) => {
  try {
    const ports = req.body;
    if (!Array.isArray(ports)) {
      return res.status(400).json({ error: 'Array required' });
    }
    for (const port of ports) {
      if (!port.name) continue;
      await Port.findOrCreate({
        where: { name: port.name },
        defaults: { name: port.name }
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk create ports' });
  }
};