import '@/app/ui/infinite-progress.css';

interface Props {
  color: string;
}

export function InfiniteProgressBar({ color } : Props) {
  return (
    <div className="container">
      <div className="progress-bar rounded-b-2xl">
        <div className={`progress-bar-value ${color}`}></div>
      </div>
    </div>
  );
}