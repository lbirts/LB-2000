# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Sound.destroy_all
Category.destroy_all

c1 = Category.create(name: "Claps & Kicks")
c2 = Category.create(name: "FX")
c3 = Category.create(name: "Percs")

s1 = Sound.create(sound_name: "Fye Clap", sound: "../backend-keyboard/Media/MC-505/Claps/FyeClap.wav", category: c1)
s2 = Sound.create(sound_name: "Cricket Slap", sound: "../backend-keyboard/Media/MC-505/Claps/Slap20waCricketbat.wav", category: c1)
s3 = Sound.create(sound_name: "Space Clap", sound: "../backend-keyboard/Media/MC-505/Claps/Space20Clap.wav", category: c1)
s13 = Sound.create(sound_name: "808 Drum", sound: "../backend-keyboard/Media/MC-505/Kicks/808drum.wav", category: c1)
s14 = Sound.create(sound_name: "Classic 808", sound: "../backend-keyboard/Media/MC-505/Kicks/Classic808.wav", category: c1)
s15 = Sound.create(sound_name: "Drum Kick", sound: "../backend-keyboard/Media/MC-505/Kicks/DrumKitKick.wav", category: c1)
s16 = Sound.create(sound_name: "Low Kick", sound: "../backend-keyboard/Media/MC-505/Kicks/LowKick.wav", category: c1)
s17 = Sound.create(sound_name: "Pumped Up Kick", sound: "../backend-keyboard/Media/MC-505/Kicks/PumpedUpKick.wav", category: c1)
s27 = Sound.create(sound_name: "ThumbyKick", sound: "../backend-keyboard/Media/MC-505/Kicks/ThumbyKick1.wav", category: c1)

s18 = Sound.create(sound_name: "Breakdance Perc", sound: "../backend-keyboard/Media/MC-505/Percs/BreakdancePerc.wav", category: c3)
s19 = Sound.create(sound_name: "Claves", sound: "../backend-keyboard/Media/MC-505/Percs/Claves.wav", category: c3)
s20 = Sound.create(sound_name: "Get Low", sound: "../backend-keyboard/Media/MC-505/Percs/Get Low Perc.wav", category: c3)
s21 = Sound.create(sound_name: "Get Da Bread", sound: "../backend-keyboard/Media/MC-505/Percs/GetDaBread.wav", category: c3)
s22 = Sound.create(sound_name: "Nice Belly", sound: "../backend-keyboard/Media/MC-505/Percs/NiceBelly.wav", category: c3)
s23 = Sound.create(sound_name: "Nintendo DS", sound: "../backend-keyboard/Media/MC-505/Percs/NintendoDS.wav", category: c3)
s24 = Sound.create(sound_name: "Woah Perc", sound: "../backend-keyboard/Media/MC-505/Percs/WoahPerc.wav", category: c3)
s25 = Sound.create(sound_name: "Shaker", sound: "../backend-keyboard/Media/MC-505/Percs/Shaker1.wav", category: c3)
s26 = Sound.create(sound_name: "Nintendo Switch", sound: "../backend-keyboard/Media/MC-505/Percs/NintendoFlavouredSwitch.wav", category: c3)


s4 = Sound.create(sound_name: "80s Action", sound: "../backend-keyboard/Media/MC-505/FX/80sAction.wav", category: c2)
s5 = Sound.create(sound_name: "Alvins Spaceship", sound: "../backend-keyboard/Media/MC-505/FX/AlvinsSpaceship.wav", category: c2)
s6 = Sound.create(sound_name: "Bad Scratcher", sound: "../backend-keyboard/Media/MC-505/FX/BadScratcher.wav", category: c2)
s7 = Sound.create(sound_name: "College Dropout", sound: "../backend-keyboard/Media/MC-505/FX/CollegeDropout.wav", category: c2)
s8 = Sound.create(sound_name: "Could Be Hard", sound: "../backend-keyboard/Media/MC-505/FX/CouldBeHard.wav", category: c2)
s9 = Sound.create(sound_name: "Hard Ass FX", sound: "../backend-keyboard/Media/MC-505/FX/HardAssFX.wav", category: c2)
s10 = Sound.create(sound_name: "Noisery", sound: "../backend-keyboard/Media/MC-505/FX/Noisery.wav", category: c2)
s11 = Sound.create(sound_name: "Rev It Cymbal", sound: "../backend-keyboard/Media/MC-505/FX/Rev'ItCymbal.wav", category: c2)
s12 = Sound.create(sound_name: "Roboboot", sound: "../backend-keyboard/Media/MC-505/FX/Roboboot1.wav", category: c2)

u1 = User.create(username:"Bauce")
u2 = User.create(username:"Lo")
u3 = User.create(username:"JazziJax")
u4 = User.create(username:"Keauli")
u5 = User.create(username:"Rianu Keeves")
u6 = User.create(username:"Nhuck Chorris")
u7 = User.create(username:"Prison Mike")


