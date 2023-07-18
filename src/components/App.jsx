import { useState, useEffect } from 'react';
import { pixabayApi } from 'services/pixabayApi';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Idle } from 'components/Idle/Idle';
import { GalleryErrorView } from 'components/GalleryErrorView/GalleryErrorView';
import { Button } from 'components/Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const [serchQuery, setSerchQuery] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);

  useEffect(() => {
    if (!serchQuery) {
      return;
    }
    setStatus(Status.PENDING);
    pixabayApi(serchQuery, page)
      .then(data => {
        if (data.hits.length > 0) {
          toast.success('Wow so easy!');
        }
        if (data.hits.length === 0) {
          toast.warning('Write valid parameter');
        }
        setQuantityPage(handleToFixed(data.totalHits));
        setData(data.hits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [page, serchQuery]);

  const handleToFixed = value => {
    const total = value / 12;
    return Number(total.toFixed(0));
  };

  const handlePagination = option => {
    setPage(page + option);
  };

  const handleFormSubmit = queryParam => {
    setSerchQuery(queryParam);
    setPage(1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} />
      {status === Status.IDLE && <Idle></Idle>}

      {status === Status.PENDING && <Loader></Loader>}

      {status === Status.RESOLVED && (
        <>
          <ImageGallery users={data} />

          {data.length > 0 && (
            <Button
              page={page}
              quantityPage={quantityPage}
              onClick={handlePagination}
            />
          )}
        </>
      )}

      {status === Status.REJECTED && <GalleryErrorView error={error.message} />}
    </div>
  );
}
