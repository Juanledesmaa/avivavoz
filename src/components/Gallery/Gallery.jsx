import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import './Gallery.scss';

const images = [
	{
		original: "https://picsum.photos/id/1018/1000/600/",
		thumbnail: "https://picsum.photos/id/1018/250/150/",
	},
	{
		original: "https://picsum.photos/id/1015/1000/600/",
		thumbnail: "https://picsum.photos/id/1015/250/150/",
	},
	{
		original: "https://picsum.photos/id/1019/1000/600/",
		thumbnail: "https://picsum.photos/id/1019/250/150/",
	},
];

const Gallery = () => {
	return (
		<div className="gallery">
			<div className="text-center">
				<Container fluid>
					<Row>
						<Col md={12}>
							<h2>Galería de fotos</h2>

							<ImageGallery items={images} />
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default Gallery;

