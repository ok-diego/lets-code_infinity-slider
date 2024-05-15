console.clear();

/* ____________DOM text______________ */
const $slide_text_each = document.querySelectorAll(".slider__text_each");
const $fake_text_each = document.querySelectorAll(".fake-text");
const $fake_text_top = document.querySelectorAll(".fake-text-top");
const $slider_text_travel = document.querySelectorAll(".slider__text_holder");

/* ____________DOM img______________ */
const $slide_img_each = document.querySelectorAll(".slider__img_each");
const $fake_img_each = document.querySelectorAll(".fake-img");
const $fake_img_top = document.querySelectorAll(".fake-img-top");
const $slider_img_travel = document.querySelector(".slider__img_holder");

/* ____________DOM buttons______________ */
const $prev_btn = document.querySelector(".prev");
const $next_btn = document.querySelector(".next");

/* ____________variables______________ */
let walk_text_distance = 25;
let walk_img_distance = 100;
let counter = 0;
let slider_text_length = $slide_text_each.length - $fake_text_each.length;
let slider_img_length = $slide_img_each.length - $fake_img_each.length;
let animating = false;

$slider_text_travel.forEach((element) => {
  element.style.transform = `translateY(${
    -walk_text_distance * (counter + $fake_text_top.length)
  }vh)`;
});

$slider_img_travel.style.transform = `translateX(${
  -walk_img_distance * (counter + $fake_img_top.length)
}vw)`;

function letsWalk() {
  $slider_text_travel.forEach((element) => {
    element.style.transform = `translateY(${
      -walk_text_distance * (counter + $fake_text_top.length)
    }vh)`;
  });

  $slider_img_travel.style.transform = `translateX(${
    -walk_img_distance * (counter + $fake_img_top.length)
  }vw)`;
}

function restart() {
  counter = 0;
  $slider_text_travel.forEach((element) => element.classList.add("reseting"));
  $slider_img_travel.classList.add("reseting");
  letsWalk();
}

function backLoop() {
  // Set the counter to the smallest value between slider_text_length and slider_img_length, then subtract 1 to adjust for zero-based index
  counter = Math.min(slider_text_length, slider_img_length) - 1;
  // Add the "reseting" class to each element in $slider_text_travel to reset their styles
  $slider_text_travel.forEach((element) => element.classList.add("reseting"));
  // Add the "reseting" class to $slider_img_travel to reset its style
  $slider_img_travel.classList.add("reseting");
  // Call letsWalk() to apply the new transformations based on the updated counter value
  letsWalk();
}

$prev_btn.addEventListener("click", function () {
  if (animating) return;
  animating = true;
  counter--;

  $slider_text_travel.forEach((element) => {
    element.classList.contains("reseting")
      ? element.classList.remove("reseting")
      : null;
  });

  $slider_img_travel.classList.contains("reseting")
    ? $slider_img_travel.classList.remove("reseting")
    : null;

  letsWalk();
});

$next_btn.addEventListener("click", function () {
  if (animating) return;
  animating = true;
  counter++;

  $slider_text_travel.forEach((element) => {
    element.classList.contains("reseting")
      ? element.classList.remove("reseting")
      : null;
  });

  $slider_img_travel.classList.contains("reseting")
    ? $slider_img_travel.classList.remove("reseting")
    : null;

  if (counter <= slider_text_length) {
    letsWalk();
  }
});

$slider_text_travel.forEach((element) => {
  element.addEventListener("transitionend", (event) => {
    if (counter == slider_text_length) {
      restart();
    }
    if (counter == -1) {
      backLoop();
    }

    element.classList.remove("is-animating");
    animating = false;
  });
});

$slider_img_travel.addEventListener("transitionend", (event) => {
  if (counter == slider_img_length) {
    restart();
  }
  if (counter == -1) {
    backLoop();
  }

  $slider_img_travel.classList.remove("is-animating");
  animating = false;
});
