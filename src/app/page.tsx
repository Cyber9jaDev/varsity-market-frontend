import Categories from "@/components/Categories";
import FooterTop from "@/components/FooterTop";
import HeroBanner from "@/components/HeroBanner";
import WhyWeAreUnique from "@/components/WhyWeAreUnique";
import styles from './styles/styles.module.scss';

export default function Home() {
  return (
    <main className={styles.home}>
      <HeroBanner />
      <Categories />
      <WhyWeAreUnique />
      <FooterTop />
    </main>
  );
}
