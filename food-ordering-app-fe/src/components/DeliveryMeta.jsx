import React from 'react';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { sample_restaurant_meta } from '../utils/mockData';
import { CDN_URL } from '../utils/constants';

const DeliveryMeta = ({ expectationNotifier = sample_restaurant_meta?.expectationNotifiers[0] }) => {
  const { icon, enrichedText, text } = expectationNotifier;
  return (
    <div className='my-2 mx-0 flex justify-start items-center gap-2'>
      <div>
        <img src={`${CDN_URL}/${icon?.imageId}`} className='w-7' />
      </div>
      <div dangerouslySetInnerHTML={{ __html: enrichedText || text }} className='notifier-text' >
      </div>
    </div>
  );
};

export default DeliveryMeta;