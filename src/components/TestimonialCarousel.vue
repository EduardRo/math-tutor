<script setup>
// Carousel
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

// Config
const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 5000,
  transition: 500,
  pauseAutoplayOnHover: true,
};

// Testimonials with images
const testimonials = [
  {
    name: "Maria Popescu",
    quote: "This app brought me peace during my darkest times.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    name: "John Ionescu",
    quote: "I found spiritual guidance when I needed it most.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    name: "Elena Georgescu",
    quote: "A true blessing for my daily reflections.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    name: "Carlos Dumitrescu",
    quote: "Helped me reconnect with my faith.",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Aisha Grigore",
    quote: "The verses provided are always so timely.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
];
</script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="(testimonial, index) in testimonials" :key="index">
      <div class="carousel__item flex flex-row items-center gap-6 text-left">
        <img
          :src="testimonial.image"
          :alt="testimonial.name"
          class="w-18 h-18 rounded-full object-cover shadow-md flex-shrink-0"
        />

        <div class="flex flex-col flex-grow">
          <blockquote class="text-xl italic mb-2 max-w-xl">
            “{{ testimonial.quote }}”
          </blockquote>
          <p class="text-lg font-semibold">{{ testimonial.name }}</p>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style scoped>
.carousel__item {
  padding: 1rem;
  color: gold;
  background-color: #000000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  align-items: row;
}

.carousel__item img {
  border-radius: 50%;
}

.text-gold {
  color: gold;
}
</style>
