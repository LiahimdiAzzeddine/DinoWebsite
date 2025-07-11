import * as THREE from 'three';


export const playActionOnce = ({
  actionName,
  sectionID,
  scrollSpeed = 1,
  actions,
  mixer,
  allref,
  isTransitioningRef,
  nextScrollTrigger,
  setCurrentModel,
  disableOtherSections,
}) => {
  if (actionName === "Down") {
    setCurrentModel(sectionID);
    disableOtherSections();
  }

  if (isTransitioningRef.current) return;

  const action = actions[actionName];
  if (!action) return;

  const oppositeName = actionName === "UP" ? "Down" : "UP";
  const oppositeAction = actions[oppositeName];
  if (oppositeAction) oppositeAction.stop();

  isTransitioningRef.current = true;

  action.reset().setLoop(THREE.LoopOnce, 1);
  action.clampWhenFinished = true;
  action.time = 0;

  const minSpeed = 2;
  const maxSpeed = 5;
  const scale = Math.min(Math.max(Math.abs((scrollSpeed !== 0 ? scrollSpeed : 20000) / 1000), minSpeed), maxSpeed);
  action.timeScale = scale;

  console.log("Animation:", actionName, "| Vitesse scroll:", scrollSpeed, "| timeScale:", scale);
  console.log("Position au début :", allref.current.position.y);

  const onFinish = () => {
    console.log("Position à la fin :", allref.current.position.y);
    isTransitioningRef.current = false;
    mixer.removeEventListener('finished', onFinish);

    if (actionName === "UP") {
      nextScrollTrigger?.enable();
    }
  };

  mixer.addEventListener('finished', (e) => {
    if (e.action === action) onFinish();
  });

  action.play();
};
