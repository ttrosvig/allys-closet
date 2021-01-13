import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import './ImgCarousel.css';

const ImgCarousel = ({ images }) => {
	const [ activeIndex, setActiveIndex ] = useState(0);
	const [ animating, setAnimating ] = useState(false);

	const items = images;

	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};

	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};

	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	};

	const slides = items.map((item, idx) => {
		return (
			<CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={idx}>
				<img className="Carousel-image" src={item.src} alt={item.altText} />
				<CarouselCaption captionHeader={item.caption} captionText={item.captionText} />
			</CarouselItem>
		);
	});

	return (
		<div className="ImgCarousel-container">
			{items.length === 0 ? null : (
				<Carousel className="Carousel" activeIndex={activeIndex} next={next} previous={previous}>
					<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
					{slides}
					<CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
					<CarouselControl direction="next" directionText="Next" onClickHandler={next} />
				</Carousel>
			)}
		</div>
	);
};

export default ImgCarousel;
