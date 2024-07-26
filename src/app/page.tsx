import styles from './styles/styles.module.scss';
import Image from "next/image";
import img from '../assets/campus4.jpg' 
import HeroBanner from '@/components/HeroBanner';
import Categories from '@/components/Categories';
import WhyWeAreUnique from '@/components/WhyWeAreUnique';
import FooterTop from '@/components/FooterTop';


export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles["bg-image"]}>
        <Image src={img} alt="bg-image"/>
      </div>
      <HeroBanner />
      <Categories />
      <WhyWeAreUnique />
      <FooterTop />
    </main>
  );
}
