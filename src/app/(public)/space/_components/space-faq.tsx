export function SpaceFaq({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <h4 className="font-display text-xl">FAQ</h4>
      <div className="text-muted-foreground mt-3 space-y-3 text-sm">
        <p>
          <strong>Q.</strong> 최소 대여 시간은? <br /> <strong>A.</strong>{' '}
          2시간부터이며, 30분 단위 연장이 가능합니다.
        </p>
        <p>
          <strong>Q.</strong> 촬영 조명 사용 가능한가요? <br />{' '}
          <strong>A.</strong> 가능하나, 사전 고지 부탁드립니다.
        </p>
      </div>
    </div>
  );
}
