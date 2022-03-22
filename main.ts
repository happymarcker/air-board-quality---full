radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 9) {
        basic.showNumber(receivedNumber)
        radio.sendNumber(kitronik_air_quality.readeCO2())
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.A, function () {
    kitronik_air_quality.measureData()
    basic.showString("Temperature:")
    basic.showNumber(kitronik_air_quality.readTemperature(kitronik_air_quality.TemperatureUnitList.C))
})
input.onButtonPressed(Button.AB, function () {
    kitronik_air_quality.calcBaselines()
})
input.onButtonPressed(Button.B, function () {
    kitronik_air_quality.measureData()
    basic.showString("CO2")
    basic.showNumber(kitronik_air_quality.readeCO2())
})
radio.setGroup(99)
radio.setTransmitPower(7)
kitronik_air_quality.setDate(21, 3, 2022)
kitronik_air_quality.setTime(5, 12, 0)
kitronik_air_quality.addProjectInfo("Classe Mme Nadine", "CO2")
kitronik_air_quality.setupGasSensor()
kitronik_air_quality.calcBaselines()
basic.forever(function () {
    kitronik_air_quality.measureData()
    kitronik_air_quality.show("Classe de " + "Mme Nadine", 1)
    kitronik_air_quality.show("" + kitronik_air_quality.readTime() + " - " + kitronik_air_quality.readDateParameter(DateParameter.Day) + "/" + kitronik_air_quality.readDateParameter(DateParameter.Month), 2)
    kitronik_air_quality.show("Temperature:" + " " + kitronik_air_quality.readTemperature(kitronik_air_quality.TemperatureUnitList.C) + " C", 3)
    kitronik_air_quality.show("Humidite: " + kitronik_air_quality.readHumidity() + " %", 4)
    kitronik_air_quality.show("Niveau de CO2: " + kitronik_air_quality.readeCO2() + " ppm", 5)
    if (kitronik_air_quality.readeCO2() < 1000) {
        basic.showIcon(IconNames.Happy)
    } else {
        if (kitronik_air_quality.readeCO2() > 3000) {
            basic.showIcon(IconNames.Skull)
        } else {
            basic.showIcon(IconNames.Sad)
        }
    }
    basic.pause(5000)
})
