# require_relative 'db'
def play_music(file)
    @pid = spawn( 'afplay', file )
end

play_music('Media/Dragonborn.mp3')