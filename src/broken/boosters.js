const config = require('../bot/files/config.json')
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(config.HyApiKey);
const Discord = require('discord.js');
const fetch = require('cross-fetch');
const slothpixel = require('slothpixel');
const fs = require('fs');
const nbt = require('prismarine-nbt');
module.exports = {
  aliases: [''],
  description: 'retrieve hypixel stats',
  callback: async ({ message, args }) => {


  }
}
