def on_received_number(receivedNumber):
    if receivedNumber == 9:
        basic.show_number(receivedNumber)
        radio.send_number(kitronik_air_quality.reade_co2())
        basic.clear_screen()
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    kitronik_air_quality.measure_data()
    basic.show_string("Temperature:")
    basic.show_number(kitronik_air_quality.read_temperature(kitronik_air_quality.TemperatureUnitList.C))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    kitronik_air_quality.send_all_data()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    kitronik_air_quality.measure_data()
    basic.show_string("CO2")
    basic.show_number(kitronik_air_quality.reade_co2())
input.on_button_pressed(Button.B, on_button_pressed_b)

radio.set_group(99)
kitronik_air_quality.set_date(19, 3, 2022)
kitronik_air_quality.set_time(17, 20, 0)
kitronik_air_quality.setup_gas_sensor()
kitronik_air_quality.calc_baselines()
kitronik_air_quality.add_project_info("Classe Mme Nadine", "CO2")

def on_forever():
    kitronik_air_quality.measure_data()
    kitronik_air_quality.show("Classe Mme Nadine", 1)
    kitronik_air_quality.show("Bonjour" + " - " + "", 2)
    kitronik_air_quality.show("Température" + str(kitronik_air_quality.read_temperature(kitronik_air_quality.TemperatureUnitList.C)) + " C",
        3)
    kitronik_air_quality.show("Humidité" + str(kitronik_air_quality.read_humidity()) + " %",
        4)
    kitronik_air_quality.show("Niveau de CO2" + str(kitronik_air_quality.reade_co2()) + " ppm",
        5)
    if kitronik_air_quality.reade_co2() < 1000:
        basic.show_icon(IconNames.HAPPY)
    else:
        if kitronik_air_quality.reade_co2() > 3000:
            basic.show_icon(IconNames.SKULL)
        else:
            basic.show_icon(IconNames.SAD)
    basic.pause(5000)
    kitronik_air_quality.log_data()
basic.forever(on_forever)
