
import emotion1 from '../resources/img/emotion1.png'; 
import emotion2 from '../resources/img/emotion2.png'; 
import emotion3 from '../resources/img/emotion3.png'; 
import emotion4 from '../resources/img/emotion4.png'; 
import emotion5 from '../resources/img/emotion5.png'; 
import emotion6 from '../resources/img/emotion6.png'; 
import emotion7 from '../resources/img/emotion7.png'; 
import emotion8 from '../resources/img/emotion8.png'; 

const emotionImgMap = {
  1: emotion1, 
  2: emotion2, 
  3: emotion3, 
  4: emotion4, 
  5: emotion5, 
  6: emotion6,
  7: emotion7,
  8: emotion8  
};

export function getEmotionImg(emotionId) {
  return emotionImgMap[emotionId];
}
