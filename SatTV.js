class SatTV {
    constructor(balance) {
        this.balance = balance;
    }

    getBalance() {
        console.log(`Current balance is ${this.balance} Rs.`)
    }

    addBalance(amount) {
        this.balance += amount;
        console.log("Recharge completed successfully.")
        this.getBalance()
    }

    buyPack(pack, months) {
        console.log("Monthly price: ", pack.packPrice)
        console.log("No of months: ", months)
        console.log("You have successfully subscribed the following packs - ", pack.name)
        let subsPrice = pack.packPrice * months;
        console.log("Subscription Amount: ", pack.packPrice * months)
        let discount = subsPrice / 10; // 10%
        let finalPrice = subsPrice - discount;
        console.log("Discount applied: ", discount)
        console.log("Final Price after discount: ", finalPrice)
        this.balance -= finalPrice;
        console.log("Account balance: ", this.balance)
        let subs = new Subscription(pack, pack.channels, finalPrice)
        this.sendEmail()
        this.sendNotification()
        return subs;
    }

    buyService(service) {
        this.balance-=service.rate;
        console.log("Service subscribed successfully")
        console.log("Account balance: ", this.balance)
        this.sendEmail()
        this.sendNotification()
        return service;
    }

    addChannels(subscription, channels) {
        let total = 0;
        channels.forEach(channel => {
            total += channel.rate;
        })
        subscription.rate += total;
        subscription.channels.push(...channels)
        this.balance -= total;
        console.log("Channels added successfully.")
        console.log("Account balance: ", this.balance)
    }

    sendEmail() {
        console.log("Email notification sent successfully")
    }
    sendNotification() {
        console.log("SMS notification sent successfully")
    }
}

class Pack {
    constructor(name, channels, packPrice) {
        this.name = name;
        this.channels = channels;
        this.packPrice = packPrice;
    }
}

class Channel {
    constructor(name, rate) {
        this.name = name;
        this.rate = rate;
    }
}

class Service {
    constructor(name, rate) {
        this.name = name;
        this.rate = rate;
    }
}

class Subscription {
    constructor(pack, channels, rate) {
        this.pack = pack;
        this.channels = channels;
        this.rate = rate;
    }
}

class User {
    constructor(email, phone) {
        this.email = email;
        this.phone = phone;
    }

    setEmail(email){
        this.email = email;
    }
    setPhone(phone){
        this.phone = phone;
    }
}

module.exports = { SatTV, Pack, Channel, Service, User };