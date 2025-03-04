import '@/app/ui/infinite-progress.css';

interface Props {
  color: string;
}

export function InfiniteProgressBar({ color } : Props) {
  return (
    <div className="container">
      <div className="progress-bar rounded-b-2xl">
        <div className={`progress-bar-value ${color}`}/>
      </div>
    </div>
  );
}

export function InfiniteProgressBarCard({ color } : Props) {
  return (
    <div className="w-full relative">
      <div className="rounded-b-2xl w-full h-[10px] overflow-hidden absolute -top-[10px] z-0">
        <div className={`progress-bar-value ${color}`}/>
      </div>
    </div>
  );
}