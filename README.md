
# Nadhaswaram Melody Maker

An interactive web application that allows users to play and record melodies using the Nadhaswaram, a traditional South Indian wind instrument.

## Features

- Virtual Nadhaswaram keyboard with authentic sounds
- Play notes using computer keyboard or by clicking/tapping
- Interactive animation that responds to played notes
- Record, save, and play back your melodies
- Reference chart showing keyboard mappings to Nadhaswaram notes

## Sound Files

This application requires Nadhaswaram sound files. You'll need to add sound files for each note to the `/public/sounds/` directory:

- `/public/sounds/sa.mp3` - Shadja (Sa)
- `/public/sounds/ri.mp3` - Rishabha (Ri)
- `/public/sounds/ga.mp3` - Gandhara (Ga)
- `/public/sounds/ma.mp3` - Madhyama (Ma)
- `/public/sounds/pa.mp3` - Panchama (Pa)
- `/public/sounds/dha.mp3` - Dhaivata (Dha)
- `/public/sounds/ni.mp3` - Nishada (Ni)
- `/public/sounds/sa_high.mp3` - Higher Shadja (SA)

You can record these sounds using a real Nadhaswaram or find royalty-free samples online.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- HTML5 Audio API
- Local Storage for saving recordings

## How to Play

1. Press the corresponding keyboard keys (A, S, D, F, J, K, L, ;) to play different notes
2. Or click/tap directly on the virtual keys
3. Use the Record button to start recording a melody
4. Stop recording when finished
5. Give your recording a name and save it
6. Play back your recordings or delete them as needed

## Development

This project was created with Lovable.

```

10. Let's create a directory for sounds:
<lov-write file_path="public/sounds/placeholder.txt">
Place the sound files for each Nadhaswaram note here:
- sa.mp3
- ri.mp3
- ga.mp3
- ma.mp3
- pa.mp3
- dha.mp3
- ni.mp3
- sa_high.mp3
