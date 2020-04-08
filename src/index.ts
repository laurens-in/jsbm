// Entrypoint
import { Frequency, Time, Synth, context } from 'tone/Tone';

context.rawContext.suspend

document.addEventListener('DOMContentLoaded', () => {
  // resume playback to enable Audio API in all browsers
  document.querySelector('button.play')?.addEventListener('click', function() {
    context.resume().then(() => {
        console.log('Playback resumed successfully');
    });
  });
  document.querySelector('button.stop')?.addEventListener('click', function() {

    context.rawContext.suspend().then(() => {
      console.log('Playback suspended successfully...');
    });
  });
});

const synth = new Synth();

synth.toMaster();

synth.triggerAttackRelease(
  new Frequency('C#3'),
  new Time('8n')
);
