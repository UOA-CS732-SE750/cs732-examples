import { Article } from "./schema.js";

const articles = [
  {
    title: "The Wonders of the Amazon Rainforest",
    date: new Date(),
    image: "/images/image1.jpg",
    content:
      "The Amazon Rainforest is a vast and diverse ecosystem that is home to countless species of plants and animals. It plays a crucial role in regulating the Earth's climate and is often referred to as the 'lungs of the planet'. Despite its importance, the Amazon is under threat from deforestation and climate change."
  },
  {
    title: "The Rise of Renewable Energy",
    date: new Date(),
    image: "/images/image2.jpg",
    content:
      "Renewable energy sources such as solar, wind, and hydroelectric power are becoming increasingly popular as the world seeks to reduce its reliance on fossil fuels. These clean energy sources offer a sustainable alternative that can help mitigate the impacts of climate change."
  },
  {
    title: "Exploring the Depths of the Ocean",
    date: new Date(),
    image: "/images/image3.jpg",
    content:
      "The ocean covers more than 70% of the Earth's surface and is home to a vast array of marine life. Despite its size, much of the ocean remains unexplored. Advances in technology are allowing scientists to explore the deep sea and discover new species and ecosystems."
  },
  {
    title: "The Impact of Technology on Society",
    date: new Date(),
    image: "/images/image4.jpg",
    content:
      "Technology has transformed the way we live, work, and communicate. From smartphones to social media, technological advancements have made our lives more convenient but also raised concerns about privacy and the impact on mental health."
  },
  {
    title: "The Beauty of National Parks",
    date: new Date(),
    image: "/images/image5.jpg",
    content:
      "National parks are protected areas that showcase the natural beauty and biodiversity of a region. They provide a sanctuary for wildlife and offer visitors the opportunity to connect with nature. Popular national parks include Yellowstone, Yosemite, and the Grand Canyon."
  },
  {
    title: "The Future of Space Exploration",
    date: new Date(),
    image: "/images/image6.jpg",
    content:
      "Space exploration has captivated humanity for decades. With advancements in technology, we are now closer than ever to sending humans to Mars and beyond. Private companies like SpaceX are playing a significant role in the future of space travel."
  },
  {
    title: "The Importance of Biodiversity",
    date: new Date(),
    image: "/images/image7.jpg",
    content:
      "Biodiversity refers to the variety of life on Earth, including plants, animals, and microorganisms. It is essential for ecosystem stability and human well-being. Protecting biodiversity is crucial for maintaining the health of our planet."
  },
  {
    title: "The Evolution of Artificial Intelligence",
    date: new Date(),
    image: "/images/image8.jpg",
    content:
      "Artificial intelligence (AI) is rapidly evolving and has the potential to revolutionize various industries. From healthcare to finance, AI is being used to improve efficiency and decision-making. However, it also raises ethical concerns about job displacement and privacy."
  },
  {
    title: "The Wonders of the Northern Lights",
    date: new Date(),
    image: "/images/image9.jpg",
    content:
      "The Northern Lights, or Aurora Borealis, are a natural light display that occurs in the polar regions. They are caused by the interaction of solar particles with the Earth's magnetic field. The Northern Lights are a breathtaking sight that attracts tourists from around the world."
  },
  {
    title: "The Role of Bees in Ecosystems",
    date: new Date(),
    image: "/images/image10.jpg",
    content:
      "Bees play a crucial role in pollinating plants, which is essential for food production and ecosystem health. However, bee populations are declining due to factors such as habitat loss and pesticide use. Protecting bees is vital for maintaining biodiversity and food security."
  },
  {
    title: "The Impact of Climate Change on Wildlife",
    date: new Date(),
    image: "/images/image11.jpg",
    content:
      "Climate change is having a profound impact on wildlife around the world. Rising temperatures, changing precipitation patterns, and habitat loss are threatening many species. Conservation efforts are needed to protect vulnerable wildlife and their habitats."
  },
  {
    title: "The Benefits of Urban Green Spaces",
    date: new Date(),
    image: "/images/image12.jpg",
    content:
      "Urban green spaces, such as parks and gardens, provide numerous benefits for city dwellers. They offer a place for recreation, improve air quality, and support mental well-being. Investing in green spaces is essential for creating healthy and sustainable cities."
  },
  {
    title: "The History of Renewable Energy",
    date: new Date(),
    image: "/images/image13.jpg",
    content:
      "Renewable energy has a long history, dating back to the use of windmills and waterwheels. Today, renewable energy technologies have advanced significantly, offering a viable alternative to fossil fuels. Understanding the history of renewable energy can help us appreciate its potential for the future."
  },
  {
    title: "The Importance of Coral Reefs",
    date: new Date(),
    image: "/images/image14.jpg",
    content:
      "Coral reefs are some of the most diverse and productive ecosystems on Earth. They provide habitat for countless marine species and protect coastlines from erosion. However, coral reefs are under threat from climate change, pollution, and overfishing."
  },
  {
    title: "The Future of Electric Vehicles",
    date: new Date(),
    image: "/images/image15.jpg",
    content:
      "Electric vehicles (EVs) are becoming increasingly popular as a sustainable alternative to traditional gasoline-powered cars. Advances in battery technology and charging infrastructure are making EVs more accessible and convenient for consumers."
  },
  {
    title: "The Role of Wetlands in Ecosystems",
    date: new Date(),
    image: "/images/image16.jpg",
    content:
      "Wetlands are vital ecosystems that provide numerous benefits, including water filtration, flood control, and habitat for wildlife. Protecting and restoring wetlands is essential for maintaining biodiversity and ecosystem health."
  },
  {
    title: "The Impact of Plastic Pollution",
    date: new Date(),
    image: "/images/image17.jpg",
    content:
      "Plastic pollution is a growing environmental issue that affects oceans, rivers, and land. Single-use plastics are a major contributor to pollution, harming wildlife and ecosystems. Reducing plastic use and improving waste management are crucial for addressing this problem."
  },
  {
    title: "The Benefits of Sustainable Agriculture",
    date: new Date(),
    image: "/images/image18.jpg",
    content:
      "Sustainable agriculture practices aim to produce food in a way that is environmentally friendly and socially responsible. Techniques such as crop rotation, organic farming, and agroforestry can help improve soil health, reduce pollution, and support biodiversity."
  },
  {
    title: "The Wonders of the Great Barrier Reef",
    date: new Date(),
    image: "/images/image19.jpg",
    content:
      "The Great Barrier Reef is the world's largest coral reef system, located off the coast of Australia. It is home to a diverse array of marine life and is a UNESCO World Heritage site. The reef is under threat from climate change, pollution, and overfishing."
  },
  {
    title: "The Importance of Forest Conservation",
    date: new Date(),
    image: "/images/image20.jpg",
    content:
      "Forests are vital ecosystems that provide habitat for wildlife, regulate the climate, and support human livelihoods. Deforestation is a major environmental issue, driven by agriculture, logging, and urbanization. Protecting and restoring forests is essential for maintaining biodiversity and ecosystem health."
  }
];

export async function seedDatabase() {
  await Article.deleteMany({});
  const createdArticles = await Article.insertMany(articles);
  console.log(`Seeded database with ${createdArticles.length} articles:`);
  createdArticles.forEach((article) => {
    console.log(`- ${article.title} (_id = ${article._id})`);
  });
}
