// =====================================================
 // FRESHFOLD LAUNDRY CO. - MIDTERM PRACTICAL
 // =====================================================
gsap.registerPlugin(ScrollTrigger);
// –– B1: DARK MODE TOGGLE ––
const darkModeToggle = document.querySelector("#darkModeToggle");
if (darkModeToggle) {
 darkModeToggle.addEventListener("click", () => {
 document.documentElement.classList.toggle("dark");
 });
 }
// –– D1 + D2: PAGE-LOAD INTRO TIMELINE ––
const introTimeline = gsap.timeline({
 defaults: {
 duration: 0.7,
 ease: "power2.out"
  // Smooth easing makes the entrance feel natural.
 }
 });
introTimeline
 .from(".hero-title", {
 y: 50,
 opacity: 0
 })
 .from(".hero-description", {
 y: 30,
 opacity: 0
 }, "-=0.4")
 // Overlaps with the title animation for a faster entrance.
 .from(".hero-button", {
 scale: 0.8,
 opacity: 0,
 stagger: 0.2
 }, "-=0.3")
 // Stagger creates a sequence between buttons.
 .from(".hero-image", {
 x: 50,
 opacity: 0,
 ease: "back.out(1.4)"
 // A slight bounce adds emphasis to the image.
 }, "-=0.4");
// –– D3: CLICK INTERACTION ––
const replayBtn = document.querySelector("#replayBtn");
if (replayBtn) {
 replayBtn.addEventListener("click", () => {
 introTimeline.restart();
 });
 }
// –– E1 + E2 + E3: SCROLL EFFECTS AND REDUCED MOTION ––
gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
// E1: SCROLL REVEALS
// Each .reveal element gets its own ScrollTrigger.


gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.fromTo(element,
        {
            y: 40,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});




// E2: SCROLL-LINKED PROGRESS BAR


gsap.to("#progressBar", {
    scaleX: 1,
    transformOrigin: "left center",
    ease: "none",
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});
});
// For visitors who prefer reduced motion, content remains visible
 // because scroll animations are not applied to them.




