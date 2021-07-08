const readline = require("readline");
const { SatTV, Pack, Channel, Service, User } = require("./SatTV");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const satTVObj = new SatTV(100);
const zeeChannel = new Channel("Zee", 10)
const sonyChannel = new Channel("Sony", 15)
const starPlusChannel = new Channel("StarPlus", 20)
const disChannel = new Channel("Discovery", 10)
const natGeoChannel = new Channel("Nat Geo", 20)
const engService = new Service("LearnEnglish", 200)
const cookService = new Service("LearnCooking", 100)
const silverPack = new Pack("Silver pack", [zeeChannel, sonyChannel, starPlusChannel], 50)
const goldenPack = new Pack("Gold Pack", [zeeChannel, sonyChannel, starPlusChannel, disChannel, natGeoChannel], 100)
const user = new User('test@gmail.com',1234567890)

const channels = [zeeChannel, sonyChannel, starPlusChannel, disChannel, natGeoChannel]
const services = [engService, cookService]
const packs = [silverPack, goldenPack]
let subscription;
let purServices = [];
function satTV() {
    rl.question("\nWelcome to SatTV" +
        "\n1. View current balance in the account" +
        "\n2. Recharge Account" +
        "\n3. View available packs, channels and services" +
        "\n4. Subscribe to base packs" +
        "\n5. Add channels to an existing subscription" +
        "\n6. Subscribe to special services" +
        "\n7. View current subscription details" +
        "\n8. Update email and phone number for notifications" +
        "\n9. Exit \n\n Enter the option:", numb => {
            try {
                switch (parseInt(numb)) {
                    case 1:
                        satTVObj.getBalance();
                        break;
                    case 2:
                        rl.question("Enter the amount to recharge:", (amount) => {
                            satTVObj.addBalance(parseInt(amount));
                            satTV()
                        })
                        break;
                    case 3: {
                        console.log("Available packs for subscription")
                        packs.forEach(pack => {
                            let str = pack.name + ": ";
                            pack.channels.forEach(channel => {
                                str += channel.name + ", "
                            })
                            console.log(`${str}: ${pack.packPrice} RS.`)
                        })
                        console.log("Available channels for subscription")
                        channels.forEach(channel => {
                            console.log(`${channel.name}: ${channel.rate} RS.`)
                        })
                        console.log("Available services for subscription")
                        services.forEach(service => {
                            console.log(`${service.name} Service: ${service.rate} RS.`)
                        })

                    }
                        break;
                    case 4: {
                        rl.question("Enter the Pack you wish to subscribe: (Silver: ‘S’, Gold: ‘G’):", alpha => {
                            rl.question("Enter the months:", months => {
                                switch (alpha) {
                                    case 'S': {
                                        subscription = satTVObj.buyPack(silverPack, parseInt(months))                                
                                    }
                                        break;
                                    case 'G': {
                                        subscription = satTVObj.buyPack(goldenPack, parseInt(months))
                                    }
                                        break;
                                    default:
                                        console.log("Invalid Input")
                                }
                                satTV()
                            })
                        })
                    }
                        break;
                    case 5:
                        rl.question("Enter channel names to add (separated by commas):",(channelsInput) => {
                            let cnl = channelsInput.split(",")
                            let chnls = []
                            channels.forEach(channel => {
                                if(cnl.find(str=> str.trim() == channel.name)){
                                    chnls.push(channel);
                                }
                            })
                            satTVObj.addChannels(subscription, chnls)
                            satTV()
                        })
                        break;
                    case 6:{
                        console.log("Subscribe to special services");
                        rl.question("Enter the service name:",servName => {
                            let serv = services.find(ser=> ser.name == servName)
                            let purch = satTVObj.buyService(serv)
                            purServices.push(purch)
                            satTV()
                        })
                    }
                        break;
                    case 7:{
                        console.log("View current subscription details")
                        let str = `Currently subscribed packs and channels: ${subscription.pack.name} +`
                        subscription.channels.forEach(cnl => {
                            str += `${cnl.name} + `
                        })
                        console.log(str)
                    }
                        break;
                    case 8:
                        console.log("Update email and phone number for notifications")
                        rl.question("Enter the email:",email=>{
                            rl.question("Enter phone:", phone=>{
                                user.setEmail(email);
                                user.setPhone(phone);
                                console.log("Email and Phone updated successfully")
                                satTV();
                            })
                        })
                        break;
                    case 9:
                        rl.close();
                        break;
                    default:
                        console.log("Invalid input...")
                }
                satTV();
            } catch (error) {
                console.log("Enter Valid Input...")
            }
        })
}

rl.on("close", function () {
    console.log("\nHave a nice Day !!!");
    process.exit(0);
});

satTV();