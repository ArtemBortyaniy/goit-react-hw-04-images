import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ users }) {
  return (
    <>
      <ul className="gallery">
        {users.map(user => {
          return <ImageGalleryItem key={user.id} data={user} />;
        })}
      </ul>
    </>
  );
}
