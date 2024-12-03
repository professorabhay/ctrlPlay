import { useState, useEffect } from "react";
import styled from "styled-components";
import bannerImage from "../../assets/images/banner_image.png";
import bannerImage2 from "../../assets/images/banner_image2.png";
import { FaGamepad } from "react-icons/fa";

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(bannerImage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === bannerImage ? bannerImage2 : bannerImage
      );
    }, 500); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <BannerWrapper className="d-flex align-items-center justify-content-start">
    <div className="background-container">
  <div
    className="background-image"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${currentImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  />
</div>
      <div className="banner-content w-full container text-white flex justify-center items-center mt-[72vh] lg:ml-36 ">
        <button class="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-3xl font-semibold py-6 px-8 rounded-full shadow-lg hover:brightness-110 transition-all duration-300 min-w-[280px]">
          View Games
        </button>
      </div>
    </BannerWrapper>
  );
};

export default Banner;

const BannerWrapper = styled.div`
  min-height: 768px;
  position: relative;
  overflow: hidden;

  .background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: opacity 1s ease-in-out;
  }

  .banner-content {
    position: relative;
    z-index: 1;
  }

  .banner-badge {
    background-color: var(--clr-green-normal);
    padding: 4px 16px;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.1em;
    display: inline-block;
    margin-bottom: 25px;
  }

  .banner-title {
    font-family: var(--font-family-right);
    font-size: 48px;
    font-weight: 400;
    letter-spacing: 0.09em;
    line-height: 1.2;
    max-width: 600px;
    margin-bottom: 40px;
  }

  .lead-text {
    max-width: 600px;
  }
  .banner-btn {
    min-width: 140px;
    height: 45px;
    padding: 13px 16px;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    border: 2px solid var(--clr-green-normal);
    margin-top: 33px;

    .btn-icon {
      margin-right: 16px;
    }

    &:hover {
      background-color: var(--clr-green-normal);
      .btn-text {
        color: var(--clr-white);
      }
    }
  }

  @media screen and (min-width: 992px) {
    .banner-badge {
      font-size: 26px;
    }

    .banner-title {
      font-size: 56px;
    }
  }
`;
