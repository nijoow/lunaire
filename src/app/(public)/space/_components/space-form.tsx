'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { computePrice } from '@/domain/space/pricing';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import {
  FieldPath,
  FieldValues,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  date: z.string().min(1, '날짜 선택'),
  startTime: z.string().min(1, '시작 시간'),
  endTime: z.string().min(1, '종료 시간'),
  headcount: z.number().min(1).max(30),
  purpose: z.enum(['meeting', 'workshop', 'shooting', 'party', 'other']),
  name: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email().optional(),
  notes: z.string().max(500).optional(),
  projector: z.boolean().optional(),
  speaker: z.boolean().optional(),
  private: z.boolean().optional(),
});
type SpaceInput = z.infer<typeof schema>;

export function SpaceForm() {
  const form = useForm<SpaceInput>({
    resolver: zodResolver(schema),
    defaultValues: { headcount: 6, purpose: 'meeting' },
  });

  const values = form.watch();
  const quote = React.useMemo(() => {
    if (!values.date || !values.startTime || !values.endTime) return null;
    try {
      return computePrice({
        date: values.date,
        start: values.startTime,
        end: values.endTime,
        headcount: values.headcount ?? 0,
        options: {
          projector: !!values.projector,
          speaker: !!values.speaker,
          private: !!values.private,
        },
      });
    } catch {
      return null;
    }
  }, [values]);

  async function onSubmit(v: SpaceInput) {
    // TODO: 가용성 체크 & 생성 API
    // const res = await fetch("/api/space", { method:"POST", body: JSON.stringify(v) })
    toast.success('대여 요청이 접수되었습니다.');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-2xl border p-6"
      >
        <h1 className="font-display text-4xl">Book a Space</h1>
        <p className="text-muted-foreground mt-1">
          모임·촬영·워크숍을 위한 프라이빗 공간 대여
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <FieldText name="date" label="날짜" type="date" form={form} />
          <FieldNumber
            name="headcount"
            label="인원"
            min={1}
            max={30}
            form={form}
          />
          <FieldText name="startTime" label="시작" type="time" form={form} />
          <FieldText name="endTime" label="종료" type="time" form={form} />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>용도</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="meeting">모임/회의</SelectItem>
                    <SelectItem value="workshop">워크숍/세미나</SelectItem>
                    <SelectItem value="shooting">촬영</SelectItem>
                    <SelectItem value="party">스몰 파티</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />

        <div className="grid gap-4 md:grid-cols-2">
          <FieldText name="name" label="이름" form={form} />
          <FieldText
            name="phone"
            label="연락처"
            placeholder="010-1234-5678"
            form={form}
          />
          <FieldText
            name="email"
            label="이메일 (선택)"
            placeholder="you@example.com"
            form={form}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>요청사항</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} className="rounded-xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Check name="projector" label="Projector" form={form} />
          <Check name="speaker" label="Speaker" form={form} />
          <Check name="private" label="Private" form={form} />
        </div>

        {quote && (
          <div className="mt-6 rounded-xl border p-4 text-sm">
            <div className="flex items-baseline justify-between">
              <div className="text-muted-foreground">예상 금액</div>
              <div className="text-xl font-semibold">
                ₩{quote.total.toLocaleString()}
              </div>
            </div>
            <ul className="text-muted-foreground mt-2 list-disc pl-5">
              <li>
                기본요금: ₩{quote.base.toLocaleString()} ({quote.hours}시간)
              </li>
              {quote.surcharge > 0 && (
                <li>야간/주말 가산: ₩{quote.surcharge.toLocaleString()}</li>
              )}
              {quote.options > 0 && (
                <li>옵션: ₩{quote.options.toLocaleString()}</li>
              )}
              {quote.headcount > 0 && (
                <li>인원 추가: ₩{quote.headcount.toLocaleString()}</li>
              )}
            </ul>
          </div>
        )}

        <Button type="submit" className="mt-6 rounded-xl">
          대여 요청
        </Button>
      </form>
    </Form>
  );
}

type BaseProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
};

/** Text / email / date / time 등 문자열 입력 */
type FieldTextProps<T extends FieldValues> = BaseProps<T> & {
  type?: 'text' | 'email' | 'date' | 'time' | 'tel' | 'password';
  placeholder?: string;
  inputProps?: Omit<
    React.ComponentProps<typeof Input>,
    'type' | 'id' | 'placeholder'
  >;
};

export function FieldText<T extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  inputProps,
}: FieldTextProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              id={String(name)}
              type={type}
              placeholder={placeholder}
              className="rounded-xl"
              {...inputProps}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/** 숫자 입력: RHF에 number로 들어가게 valueAsNumber 적용 */
type FieldNumberProps<T extends FieldValues> = BaseProps<T> & {
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
};

export function FieldNumber<T extends FieldValues>({
  form,
  name,
  label,
  min,
  max,
  step,
  placeholder,
}: FieldNumberProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      // RHF의 register 옵션을 FormField에서 직접 쓸 수 없으므로,
      // onChange에서 숫자 변환 처리
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              id={String(name)}
              type="number"
              min={min}
              max={max}
              step={step}
              placeholder={placeholder}
              className="rounded-xl"
              value={field.value ?? ''} // undefined 방지
              onChange={(e) => {
                const v = e.target.value;
                // 빈 문자열일 때 undefined 유지(유효성은 zod에서 처리)
                field.onChange(v === '' ? undefined : Number(v));
              }}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/** 체크박스: boolean 필드 */
type CheckProps<T extends FieldValues> = BaseProps<T> & {
  // 시멘틱 레이블 외 추가 설명이 필요하면 여기에 확장
};

export function Check<T extends FieldValues>({
  form,
  name,
  label,
}: CheckProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            id={String(name)}
            checked={!!field.value}
            onCheckedChange={field.onChange}
          />
          <label htmlFor={String(name)} className="text-sm">
            {label}
          </label>
        </div>
      )}
    />
  );
}
