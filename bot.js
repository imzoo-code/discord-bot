const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("./config.json")

bot.login(config.token)

bot.on("ready", () => {
    console.log("Bot opérationnel")
});

// MESSAGE D'ARRIVE ET DEPART

bot.on("guildMemberAdd", member => {
    console.log("un nouveau est arrivé");
    member.guild.channels.cache.find(channel => channel.id === "697845571938943007").send(member.displayName+ " est arrivé, bienvenue BG");
    
});


bot.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username}'s commands`)
            .setDescription(`**Prefix:** ${config.prefix}`)
            .addField(`\`ping\``, `Regarder le ping du bot`)
            .addField(`\`kick\``, `Usage: **${config.prefix}kick [@Utilisateur]**\n**${config.prefix}kick [@Utilisateur][Raison]**`)
            .addField(`\`ban\``, `Usage: **${config.prefix}ban [@Utilisateur]**\n**${config.prefix}ban [@Utilisateur][Raison]**`)
            .addField(`\`add\``, `Ajouter un rôle a un membre \nUsage: **${config.prefix}add [@Utilisateur] [Role]**`)
            .addField(`\`remove\``, `Supprimer un rôle a un membre \nUsage: **${config.prefix}remove [@Utilistateur] [Role]**`)
            .addField(`\`rps\``, `Jouer au pierre,feuille, ciseaux`)
            .addField(`\`say\``, `Avoir un bot qui dis quelque chose`)
        message.channel.send(helpEmbed)
    }

    if (command === "ping") {
        message.channel.send(`Pong **(${Date.now() - message.createdTimestamp}ms)**`)
    }

    if (command === "kick") {
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("Vous n'avez pas les permissions pour kick ce membre").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("Vous n'avez pas mentionnez de membre").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.kickable)
            return message.channel.send("Ce membre ne peut pas etre kick").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} a été kick (cheh), aucune raison donné`);
            })

            if (reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} a été kick (cheh) pour ${reason}`);
            })
        }
    }

    if (command === "ban") {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send("Vous n'avez pas les permissions pour ban ce membre").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("Vous n'avez pas mentionnez de membre").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.bannable)
            return message.channel.send("Ce membre ne peut pas etre ban").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.ban().then(member => {
                message.channel.send(`${member.user.tag} a été ban (cheh), aucune raison donné`);
            })

            if (reason) return member.ban(reason).then(member => {
                message.channel.send(`${member.user.tag} à été bann (cheh) pour ${reason}`);
            })
        }
    }

    if (command === "add") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Vous n'avez pas les permissions pour ajouter un role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("Vous n'avez pas mentionnez de membre").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const add = args.slice(1).join(" ")
        if (!add)
            return message.channel.send("Vous n'avez pas spécifié de role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleAdd = message.guild.roles.cache.find(role => role.name === add)
        if (!roleAdd)
            return message.channel.send("ce role n'existe pas").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (member.roles.cache.get(roleAdd.id))
            return message.channel.send(`Ce membre a maintenant le role ${add}`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.add(roleAdd.id).then((member) => {
            message.channel.send(`${add} ajouté à ${member.displayName}`)
        })
    }

    if (command === "remove") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Vous n'avez pas les permissions pour supprimer un role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("Vous n'avez pas mentionnez de membre").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const remove = args.slice(1).join(" ")
        if (!remove)
            return message.channel.send("Vous n'avez pas spécifié de role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleRemove = message.guild.roles.cache.find(role => role.name === remove)
        if (!roleRemove)
            return message.channel.send("Ce role n'existe pas").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.roles.cache.get(roleRemove.id))
            return message.channel.send(`Ce membre n'a plus le role ${remove}`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.remove(roleRemove.id).then((member) => {
            message.channel.send(`${remove} enlevé à ${member.displayName}`)
        })
    }

    if (command === "say") {
    const text = args.join(" ")
    if(!text) return message.channel.send("Vous n'avez pas spécifié quelque chose à dire")
    message.channel.send(text)
    
    }

    if (command === "rps") {
        const options = [
            "pierre :shell: ",
            "feuille :newspaper2:",
            "ciseaux :scissors: "
        ]
        const option = options[Math.floor(Math.random() * options.length)]
        message.channel.send(`vous avez ${option}`)
    }

});
