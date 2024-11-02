<template>
  <div class="relative w-max h-[1em] text-base">
    <div class="loading-wrapper h-[1em] flex items-center justify-center">
      <span class="loader inline-block"/>
    </div>
  </div>
  <!-- *** all animation class ***
  - dot-1
  - dot-2
  - dot-3
  - circle-1
  - circle-2
  - circle-3
  - circle-wave
  - dot-circle-1
  - dot-circle-2
  - dot-circle-3
  - dot-circle-4 -->
</template>

<style lang="css">
/* dot-1 */
.dot-1 .loading-wrapper {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}
.dot-1 .loading-wrapper .loader,
.dot-1 .loading-wrapper .loader:before,
.dot-1 .loading-wrapper .loader:after {
  color: #fff;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation-fill-mode: both;
  animation: dot1 1.8s infinite ease-in-out;
  background: transparent;
}
.dot-1 .loading-wrapper .loader {
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.dot-1 .loading-wrapper .loader:before,
.dot-1 .loading-wrapper .loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.dot-1 .loading-wrapper .loader:before {
  left: -1.5em;
  animation-delay: -0.32s;
}
.dot-1 .loading-wrapper .loader:after {
  left: 1.5em;
}
@keyframes dot1 {
  0%,
  80%,
  100% {
    box-shadow: 0 1em 0 -1em;
  }
  40% {
    box-shadow: 0 1em 0 0;
  }
}

/* dot-2 */
.dot-2 .loading-wrapper {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}
.dot-2 .loading-wrapper .loader,
.dot-2 .loading-wrapper .loader:before,
.dot-2 .loading-wrapper .loader:after {
  color: #fff;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation-fill-mode: both;
  animation: dot2 1.8s infinite ease-in-out;
  background: transparent;
}
.dot-2 .loading-wrapper .loader {
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.dot-2 .loading-wrapper .loader:before,
.dot-2 .loading-wrapper .loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.dot-2 .loading-wrapper .loader:before {
  left: -1.5em;
  animation-delay: -0.32s;
}
.dot-2 .loading-wrapper .loader:after {
  left: 1.5em;
}
@keyframes dot2 {
  0% {
    box-shadow: 0em 1em #fff2;
  }
  25% {
    box-shadow: 0em 1em #fff2;
  }
  50% {
    box-shadow: 0em 1em #fff;
  }
  75% {
    box-shadow: 0em 1em #fff2;
  }
  100% {
    box-shadow: 0em 1em #fff2;
  }
}

/* dot-3 */
.dot-3 .loading-wrapper {
  display: flex;
  gap: 0.3em;
}
.dot-3 .loading-wrapper .loader {
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: dot3 1s infinite ease-in-out;
  background: rgba(242, 242, 242, 0.7);
  animation-delay: -0.4s;
}
.dot-3 .loading-wrapper::before {
  content: '';
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: dot3 1s infinite ease-in-out;
  background: rgba(242, 242, 242, 0.7);
  animation-delay: -0.6s;
}
.dot-3 .loading-wrapper::after {
  content: '';
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation-fill-mode: both;
  animation: dot3 1s infinite ease-in-out;
  background: rgba(242, 242, 242, 0.7);
  animation-delay: -0.2s;
}
@keyframes dot3 {
  0%,
  80%,
  100% {
    transform: scale(0.8);
  }
  40% {
    transform: scale(1);
  }
}

/* circle-1 */
.circle-1 .loading-wrapper .loader {
  width: 1em;
  height: 1em;
  border: 0.14em solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: circle1 1s linear infinite;
}

@keyframes circle1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* circle-2 */
.circle-2 .loading-wrapper .loader {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  animation: circle2 1s linear infinite;
}
.circle-2 .loading-wrapper .loader::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 0.14em solid #fff;
  animation: circle2PrixClipFix 2s linear infinite;
}

@keyframes circle2 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes circle2PrixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}

/* circle-3 */
.circle-3 .loading-wrapper .loader {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  display: inline-block;
  border-top: 0.1em solid #fff;
  border-right: 0.1em solid transparent;
  box-sizing: border-box;
  animation: circle3 1s linear infinite;
}

@keyframes circle3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* circle-wave */
.circle-wave .loading-wrapper .loader {
  width: 1em;
  height: 1em;
  display: inline-block;
  position: relative;
}
.circle-wave .loading-wrapper .loader::after,
.circle-wave .loading-wrapper .loader::before {
  content: '';
  box-sizing: border-box;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 0.1em solid #fff;
  position: absolute;
  left: 0;
  top: 0;
  animation: circleWave 2s linear infinite;
}
.circle-wave .loading-wrapper .loader::after {
  animation-delay: 1s;
}

@keyframes circleWave {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* dot-circle-1 */
.dot-circle-1 .loading-wrapper .loader {
  width: 1em;
  height: 1em;
  border: 0.1em dotted #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: dotCircle1 2s linear infinite;
}

@keyframes dotCircle1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* dot-circle-2 */
.dot-circle-2 {
  margin: 2.6em;
}
.dot-circle-2 .loading-wrapper .loader {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: dotCircle2 1.1s infinite ease;
  transform: translateZ(0);
}
@keyframes dotCircle2 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff,
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7),
      2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff,
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff,
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;
  }
}

/* dot-circle-3 */
.dot-circle-3 {
  margin: 3.2em;
}
.dot-circle-3 .loading-wrapper .loader {
  color: #fff;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: dotCircle3 1.3s infinite linear;
  transform: translateZ(0);
}

@keyframes dotCircle3 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em,
      -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em,
      -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0,
      -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0,
      -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0,
      -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0,
      -2em -2em 0 0.2em;
  }
}

/* dot-circle-4 */
.dot-circle-4 {
  padding: 1em 0;
}
.dot-circle-4 .loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dot-circle-4 .loading-wrapper .loader {
  color: #ffffff;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  transform: translateZ(0);
  animation: dotCircle4 1.7s infinite ease, dotCircle4Round 1.7s infinite ease;
}

@keyframes dotCircle4 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em,
      -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em,
      -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}

@keyframes dotCircle4Round {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
