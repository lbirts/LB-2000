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

c1 = Category.create!(name: "Claps & Kicks")
c2 = Category.create!(name: "FX")
c3 = Category.create!(name: "Percs")
c4 = Category.create!(name: "Rick and Morty")
c5 = Category.create!(name: "Wub")
c6 = Category.create!(name: "Melody Tings")


s1 = Sound.create(sound_name: "Fye Clap", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Claps/FyeClap.wav", category: c1)
s2 = Sound.create(sound_name: "Cricket Slap", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Claps/Slap20waCricketbat.wav", category: c1)
s3 = Sound.create(sound_name: "Space Clap", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Claps/Space20Clap.wav", category: c1)
s13 = Sound.create(sound_name: "808 Drum", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Kicks/808drum.wav", category: c1)
s14 = Sound.create(sound_name: "Classic 808", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Kicks/Classic808.wav", category: c1)
s15 = Sound.create(sound_name: "Drum Kick", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Kicks/DrumKitKick.wav", category: c1)
s16 = Sound.create(sound_name: "Low Kick", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Kicks/LowKick.wav", category: c1)
s17 = Sound.create(sound_name: "Pumped Up Kick", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Kicks/PumpedUpKick.wav", category: c1)
s27 = Sound.create(sound_name: "ThumbyKick", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Kicks/ThumbyKick1.wav", category: c1)

s18 = Sound.create(sound_name: "Breakdance Perc", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Percs/BreakdancePerc.wav", category: c3)
s19 = Sound.create(sound_name: "Claves", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Percs/Claves.wav", category: c3)
s20 = Sound.create(sound_name: "Get Low", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Percs/Get Low Perc.wav", category: c3)
s21 = Sound.create(sound_name: "Get Da Bread", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Percs/GetDaBread.wav", category: c3)
s22 = Sound.create(sound_name: "Nice Belly", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Percs/NiceBelly.wav", category: c3)
s23 = Sound.create(sound_name: "Nintendo DS", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Percs/NintendoDS.wav", category: c3)
s24 = Sound.create(sound_name: "Woah Perc", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Percs/WoahPerc.wav", category: c3)
s25 = Sound.create(sound_name: "Shaker", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Percs/Shaker1.wav", category: c3)
s26 = Sound.create(sound_name: "Nintendo Switch", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/Percs/NintendoFlavouredSwitch.wav", category: c3)


s4 = Sound.create(sound_name: "80s Action", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/FX/80sAction.wav", category: c2)
s5 = Sound.create(sound_name: "Alvins Spaceship", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/FX/AlvinsSpaceship.wav", category: c2)
s6 = Sound.create(sound_name: "Bad Scratcher", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/FX/BadScratcher.wav", category: c2)
s7 = Sound.create(sound_name: "College Dropout", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/FX/CollegeDropout.wav", category: c2)
s8 = Sound.create(sound_name: "Could Be Hard", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/FX/CouldBeHard.wav", category: c2)
s9 = Sound.create(sound_name: "Hard Ass FX", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/FX/HardAssFX.wav", category: c2)
s10 = Sound.create(sound_name: "Noisery", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/FX/Noisery.wav", category: c2)
s11 = Sound.create(sound_name: "Rev It Cymbal", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/FX/Rev'ItCymbal.wav", category: c2)
s12 = Sound.create(sound_name: "Roboboot", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MC-505/FX/Roboboot1.wav", category: c2)

s28 = Sound.create(sound_name: "Pickle Rick", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/RKSounds/I'm Pickle Rick Sound Clip.mp3", category: c4)
s29 = Sound.create(sound_name: "Wubba Lubba Dub", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/RKSounds/WUBBA LUBBA DUB DUB .mp3", category: c4)
s30 = Sound.create(sound_name: "Rick Waiting", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/RKSounds/Rick Random.m4a", category: c4)
s31 = Sound.create(sound_name: "Portal Gun", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/RKSounds/Portal Gun Sound.mp3", category: c4)
s32 = Sound.create(sound_name: "Poof", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/RKSounds/Poof.m4a", category: c4)
s33 = Sound.create(sound_name: "Show Me", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/RKSounds/SHOW ME WHAT YOU GOT.mp3", category: c4)
s34 = Sound.create(sound_name: "Morty Scream", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/RKSounds/Morty Scream.m4a", category: c4)
s35 = Sound.create(sound_name: "Mr.Meseeks 1", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/RKSounds/Im mr Meeseeks.m4a", category: c4)
s36 = Sound.create(sound_name: "Mr.Meseeks 2", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/RKSounds/Mr Meeseeks running at you.m4a", category: c4)

s37 = Sound.create(sound_name: "Int", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/Skrillex/Intro.m4a", category: c5)
s38 = Sound.create(sound_name: "DADAD", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/Skrillex/dada.m4a", category: c5)
s39 = Sound.create(sound_name: "DONDO", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/Skrillex/DONDON.m4a", category: c5)
s40 = Sound.create(sound_name: "UHUHUH", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/Skrillex/Uh.m4a", category: c5)
s41 = Sound.create(sound_name: "WEUH", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/Skrillex/Weuh.m4a", category: c5)
s42 = Sound.create(sound_name: "YEAH", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/Skrillex/Yea.m4a", category: c5)
s43 = Sound.create(sound_name: "Fight", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/Skrillex/Fight.m4a", category: c5)
s44 = Sound.create(sound_name: "Victory", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/Skrillex/VIctory.m4a", category: c5)
s45 = Sound.create(sound_name: "Bluub", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/Skrillex/Bluub.m4a", category: c5)

s46 = Sound.create(sound_name: "Ting", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MelodyTings/Ting.m4a", category: c6)
s47 = Sound.create(sound_name: "Snap", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MelodyTings/Snap.m4a", category: c6)
s48 = Sound.create(sound_name: "Malt", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MelodyTings/Malt.m4a", category: c6)
s49 = Sound.create(sound_name: "Deep", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MelodyTings/Deep.m4a", category: c6)
s50 = Sound.create(sound_name: "Knock", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MelodyTings/Knock.m4a", category: c6)
s51 = Sound.create(sound_name: "Hihat Closed", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MelodyTings/HihatClosed.m4a", category: c6)
s52 = Sound.create(sound_name: "Blip", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MelodyTings/Blip.m4a", category: c6)
s53 = Sound.create(sound_name: "Tom", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MelodyTings/Tom.m4a", category: c6)
s54 = Sound.create(sound_name: "Melody", filename: "https://fierce-wildwood-65072.herokuapp.com/Media/MelodyTings/Melody.m4a", category: c6)


u1 = User.create(username:"Bauce")
u2 = User.create(username:"Lo")
u3 = User.create(username:"JazziJax")
u4 = User.create(username:"Keauli")
u5 = User.create(username:"Rianu Keeves")
u6 = User.create(username:"Nhuck Chorris")
u7 = User.create(username:"Prison Mike")

