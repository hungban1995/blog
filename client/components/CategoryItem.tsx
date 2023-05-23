import { IMG_URL } from "@/constant";
import Link from "next/link";
import Card from "react-bootstrap/Card";
interface Props {
  category: any;
}
function CategoryItem({ category }: Props) {
  return (
    <Card style={{ margin: "10px" }}>
      <Card.Img variant="top" src={`${IMG_URL}/${category.image}`} />
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
