export const CONTACT = {
  company: "Frankburn Properties",
  phones: [
    { display: "0721 633 111", tel: "+254721633111" },
    { display: "0728 221 665", tel: "+254728221665" },
  ],
  whatsapp: { display: "0742 292 727", number: "254742292727" },
  email: "Idimemalindi@gmail.com",
  formEndpoint: "https://formspree.io/f/mqaljjoz",
};

export const whatsappLink = (message = "Hi Frankburn Properties, I'd like to know more about your listings.") =>
  `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const emailLink = (subject = "Property enquiry", body = "") =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const telLink = (index = 0) => `tel:${CONTACT.phones[index].tel}`;
