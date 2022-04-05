import Loader from './Loader'

export interface AbsoluteLoaderProps {
  enabled: boolean;
}

// eslint-disable-next-line no-unused-vars
const AbsoluteLoader = ({ enabled }: AbsoluteLoaderProps) => {
  return (
    <div
      className='absolute left-1/2 bottom-0 flex items-center justify-center p-3 -translate-x-1/2 -translate-y-1/2'
    >
      { enabled &&
        <Loader
          height='25'
          width='25'
          color='grey'
          ariaLabel='loading'
        />
      }
    </div>
  );
};

export default AbsoluteLoader;