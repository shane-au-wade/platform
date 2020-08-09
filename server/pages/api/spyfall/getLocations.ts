import {locations} from '../../../locations'

export default async (req, res) => {
    res.statusCode = 200
    res.json(locations)
  }