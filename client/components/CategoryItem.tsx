import { IMG_URL } from "@/constant";
import Link from "next/link";
import Card from "react-bootstrap/Card";
export interface TCategory {
  title: string;
  description: string;
  image: string;
  id: number;
}
interface Props {
  category: TCategory;
}
function CategoryItem({ category }: Props) {
  return (
    <Card className="category-item-card">
      <Card.Img
        src={`${IMG_URL}/${category.image}`}
        alt="cat"
        className="category-item-card__img"
      />
      <Card.Body>
        <Link href={`categories/${category.title.toLowerCase()}`}>
          {category.title}
        </Link>
        <Card.Text>{category.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CategoryItem;
