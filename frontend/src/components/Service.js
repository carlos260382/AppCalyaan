import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Service(props) {
    const { service } = props;
  console.log('estos son los servicios', service)
    return (
    <div key={service._id} className="card">
      <Link to={`/service/${service._id}`}>
        <img className="medium" src={service.image} alt={service.name} />
      </Link>
      <div className="card-body">
        <Link to={`/service/${service._id}`}>
          <h2>{service.name}</h2>
        </Link>
        <Rating
          rating={service.rating}
          numReviews={service.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">${service.price}</div>
          <div>
            <Link to={`/seller/${service.seller._id}`}>
              {service.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
