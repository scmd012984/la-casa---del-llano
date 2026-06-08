import { restaurantInfo } from "@/lib/data";

export const phoneDigits = restaurantInfo.phone.replace(/\D/g, "");

export const telHref = `tel:+${phoneDigits}`;

export const whatsappHref = `https://wa.me/${phoneDigits}`;

export const mailtoHref = `mailto:${restaurantInfo.email}`;
