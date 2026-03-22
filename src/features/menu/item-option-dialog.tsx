'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { MenuItem } from '@/domain/menu/types';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

// ────────────────────────────────────────────────────────────
// 옵션 타입 정의
// ────────────────────────────────────────────────────────────

export type SelectedOptions = {
  temperature?: 'ice' | 'hot';
  bean?: 'nutty' | 'acidic' | 'decaf';
  shot?: 'normal' | 'extra' | 'double-extra';
  strength?: 'light' | 'normal' | 'strong';
};

// ────────────────────────────────────────────────────────────
// 카테고리별 옵션 노출 여부
// ────────────────────────────────────────────────────────────

const OPTION_MAP: Record<
  string,
  {
    temperature: boolean;
    bean: boolean;
    shot: boolean;
    strength: boolean;
  }
> = {
  coffee: { temperature: true, bean: true, shot: true, strength: true },
  'non-coffee': {
    temperature: true,
    bean: false,
    shot: false,
    strength: false,
  },
  dessert: { temperature: false, bean: false, shot: false, strength: false },
};

const DEFAULT_OPTIONS: Required<SelectedOptions> = {
  temperature: 'ice',
  bean: 'nutty',
  shot: 'normal',
  strength: 'normal',
};

// ────────────────────────────────────────────────────────────
// 유틸: 옵션을 사람이 읽기 좋은 문자열로
// ────────────────────────────────────────────────────────────

export function formatOptions(opts: SelectedOptions): string {
  const parts: string[] = [];
  if (opts.temperature) parts.push(opts.temperature === 'ice' ? 'Ice' : 'Hot');
  if (opts.bean)
    parts.push(
      { nutty: 'Full Moon', acidic: 'Crescent', decaf: 'New Moon' }[
        opts.bean
      ] ?? '',
    );
  if (opts.shot && opts.shot !== 'normal')
    parts.push(
      { extra: '샷 추가', 'double-extra': '샷 2번 추가' }[opts.shot] ?? '',
    );
  if (opts.strength && opts.strength !== 'normal')
    parts.push({ light: '연하게', strong: '진하게' }[opts.strength] ?? '');
  return parts.filter(Boolean).join(' · ');
}

// ────────────────────────────────────────────────────────────
// 칩 선택 그룹
// ────────────────────────────────────────────────────────────

interface ChipGroupProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}

const ChipGroup = <T extends string>({
  label,
  options,
  value,
  onChange,
}: ChipGroupProps<T>) => (
  <div>
    <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
      {label}
    </p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={
            opt.value === value
              ? 'border-primary bg-primary text-primary-foreground rounded-full border-2 px-4 py-1.5 text-sm transition'
              : 'hover:bg-muted border-input rounded-full border px-4 py-1.5 text-sm transition'
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────
// 다이얼로그 컴포넌트
// ────────────────────────────────────────────────────────────

interface Props {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (
    item: MenuItem,
    options: SelectedOptions,
    quantity: number,
  ) => void;
}

export const ItemOptionDialog = ({ item, open, onClose, onConfirm }: Props) => {
  const [options, setOptions] = useState<Required<SelectedOptions>>({
    ...DEFAULT_OPTIONS,
  });
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const show = OPTION_MAP[item.category] ?? {
    temperature: false,
    bean: false,
    shot: false,
    strength: false,
  };

  const hasOptions =
    show.temperature || show.bean || show.shot || show.strength;

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      onClose();
      setTimeout(() => {
        setOptions({ ...DEFAULT_OPTIONS });
        setQuantity(1);
      }, 300);
    }
  };

  const handleConfirm = () => {
    onConfirm(item, options, quantity);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl">{item.name}</DialogTitle>
          {item.note && (
            <p className="text-muted-foreground mt-1 text-sm">{item.note}</p>
          )}
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* 옵션 영역 */}
          {hasOptions && (
            <>
              {show.temperature && (
                <ChipGroup
                  label="온도"
                  options={[
                    { value: 'ice', label: '🧊 Ice' },
                    { value: 'hot', label: '☕ Hot' },
                  ]}
                  value={options.temperature}
                  onChange={(v) =>
                    setOptions((p) => ({ ...p, temperature: v }))
                  }
                />
              )}

              {show.bean && (
                <ChipGroup
                  label="원두"
                  options={[
                    { value: 'nutty', label: 'Full Moon (고소)' },
                    { value: 'acidic', label: 'Crescent (산미)' },
                    { value: 'decaf', label: 'New Moon (디카페인)' },
                  ]}
                  value={options.bean}
                  onChange={(v) => setOptions((p) => ({ ...p, bean: v }))}
                />
              )}

              {show.shot && (
                <ChipGroup
                  label="샷"
                  options={[
                    { value: 'normal', label: '기본' },
                    { value: 'extra', label: '샷 추가 (+1)' },
                    { value: 'double-extra', label: '샷 추가 (+2)' },
                  ]}
                  value={options.shot}
                  onChange={(v) => setOptions((p) => ({ ...p, shot: v }))}
                />
              )}

              {show.strength && (
                <ChipGroup
                  label="농도"
                  options={[
                    { value: 'light', label: '연하게' },
                    { value: 'normal', label: '기본' },
                    { value: 'strong', label: '진하게' },
                  ]}
                  value={options.strength}
                  onChange={(v) => setOptions((p) => ({ ...p, strength: v }))}
                />
              )}
            </>
          )}

          {/* 수량 */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              수량
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            className="w-full rounded-xl py-5 text-base font-semibold"
            onClick={handleConfirm}
          >
            ₩{(item.price * quantity).toLocaleString()} 담기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
