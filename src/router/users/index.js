import {User} from "#root/db/models";

import generateUUID from "#root/helpers/generateUUID"
import hashPassword from "#root/helpers/hashPassword"

const express = require('express')
const router = express.Router()

router.get('/all', async (req, res) => {
  const result = await User.findAll();
  return res.json(result);
})

router.get('/find', async (req, res, next) => {
  if (!req.body.email) {
    return next(new Error("Invalid Request Body."));
  }

  try {
    const result = await User.findAll({
      where: {...req.body}
    })

    return res.json(result)
  } catch (err) {
    return next(err)
  }
})

router.post('/create', async (req, res, next) => {
  if (!req.body.email || !(req.body.password)) {
    return next(new Error("Invalid Body."));
  }

  try {
    const newUser = await User.create({
      id: generateUUID(),
      email: req.body.email,
      passwordHash: hashPassword(req.body.password)
    })

    return res.json(newUser)
  } catch (err) {
    return next(err)
  }
})

router.patch('/update/password', async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.password.length) {
    return next(new Error("Invalid Request Body."));
  }

  try {
    const result = await User.update(
      {passwordHash: hashPassword(req.body.password)},
      {where: {...req.body.email}}
    )

    return res.json(result)
  } catch (err) {
    return next(err)
  }
})

router.delete('/delete', async (req, res) => {
  if (!req.body.email) {
    return next(new Error("Invalid Request Body."));
  }

  try {
    const result = await User.destroy({
      where: {
        ...req.body.email
      }
    })

    return res.json(result)
  } catch (err) {
    return next(err)
  }
})

module.exports = router
