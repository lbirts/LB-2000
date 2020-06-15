# require_relative 'db'
def play_music(file)
    spawn( 'afplay', file )
end

play_music('../backend-keyboard/Media/MC-505/Claps/FyeClap.wav')

# backend-keyboard/Media/Dragonborn.mp3



# def stop_music
#     pid = fork{ system 'killall', 'afplay' }
# end

# stop_music