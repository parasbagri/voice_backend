# # tts_synthesizer.py
# from TTS.api import TTS
# import sys

# # Input text command line se lein
# text = sys.argv[1] if len(sys.argv) > 1 else "Namaste Duniya!"

# # Model load 
# tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC")

# # Audio generate
# tts.tts_to_file(text=text, file_path="output.wav")


import sys
from gtts import gTTS

def synthesize_text():
    # Command line arguments se text taken
    text = sys.argv[1]
    output_path = sys.argv[2]
    # voice = sys.argv[2]  # Voice parameter (male/female)
    #  output_path = sys.argv[3]
    
    # Text ko audio me convert 
    tts = gTTS(text=text, lang='hi')  # 'en' language specify 
    tts.save(output_path)
    print("Audio file generated:", output_path)

if __name__ == "__main__":
    synthesize_text()