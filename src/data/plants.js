const SEGMENT = {
  U199: "under 199",
  U299: "under 299",
  U399: "under 399",
  U599: "under 599",
  U999: "under 999",
};

const plants = [
  { id:"aloevera-mini", name:"Aloe Vera Mini", price:179, segment:SEGMENT.U199, img:"/assets/aloevera.jpg", stock:25 },
  { id:"snake-starter", name:"Snake Plant Starter", price:289, segment:SEGMENT.U299, img:"/assets/snake.jpg", stock:18 },
  { id:"money-bush", name:"Money Plant Bushy", price:349, segment:SEGMENT.U399, img:"/assets/money.jpg", stock:30 },
  { id:"areca-table", name:"Areca Palm Table", price:549, segment:SEGMENT.U599, img:"/assets/areca.jpg", stock:12 },
  { id:"ficus-lyrata-mini", name:"Fiddle Leaf Fig Mini", price:899, segment:SEGMENT.U999, img:"/assets/ficus.jpg", stock:7 },
];

export { SEGMENT };
export default plants;
