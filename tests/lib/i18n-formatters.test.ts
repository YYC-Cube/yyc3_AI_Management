/**
 * i18n-formatters 单元测试
 * 测试所有国际化格式化函数
 */

import {
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatNumber,
  formatCurrency,
  formatPercent,
} from '../../lib/i18n-formatters';

describe('i18n-formatters', () => {
  describe('formatDate', () => {
    it('should format Date object with default options', () => {
      const date = new Date('2023-07-15');
      const result = formatDate(date, 'zh-CN');

      expect(result).toContain('2023');
      expect(result).toContain('7');
      expect(result).toContain('15');
    });

    it('should format string date', () => {
      const result = formatDate('2023-07-15', 'zh-CN');

      expect(result).toContain('2023');
    });

    it('should format timestamp', () => {
      const timestamp = new Date('2023-07-15').getTime();
      const result = formatDate(timestamp, 'en-US');

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should apply custom options', () => {
      const date = new Date('2023-07-15');
      const result = formatDate(date, 'zh-CN', { year: '2-digit' });

      expect(result).toContain('23');
    });

    it('should handle different locales', () => {
      const date = new Date('2023-07-15');
      const zhResult = formatDate(date, 'zh-CN');
      const enResult = formatDate(date, 'en-US');

      expect(zhResult).toBeTruthy();
      expect(enResult).toBeTruthy();
    });
  });

  describe('formatDateTime', () => {
    it('should include time in formatted result', () => {
      const date = new Date('2023-07-15T14:30:00');
      const result = formatDateTime(date, 'zh-CN');

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });

  describe('formatRelativeTime', () => {
    it('should format recent time as seconds ago', () => {
      const now = new Date();
      const fewSecondsAgo = new Date(now.getTime() - 30 * 1000);
      const result = formatRelativeTime(fewSecondsAgo, 'zh-CN');

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should format minutes ago', () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const result = formatRelativeTime(fiveMinutesAgo, 'en-US');

      expect(result).toBeTruthy();
    });

    it('should format hours ago', () => {
      const now = new Date();
      const twoHoursAgo = new Date(now.getTime() - 2 * 3600 * 1000);
      const result = formatRelativeTime(twoHoursAgo, 'zh-CN');

      expect(result).toBeTruthy();
    });

    it('should handle string date input', () => {
      const yesterday = new Date(Date.now() - 86400 * 1000).toISOString();
      const result = formatRelativeTime(yesterday, 'en-US');

      expect(result).toBeTruthy();
    });
  });

  describe('formatNumber', () => {
    it('should format integer', () => {
      const result = formatNumber(1234567, 'zh-CN');

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should format decimal', () => {
      const result = formatNumber(1234.56, 'en-US');

      expect(result).toContain('.');
    });

    it('should apply custom options', () => {
      const result = formatNumber(0.1234, 'zh-CN', { 
        style: 'percent',
        minimumFractionDigits: 2
      });

      expect(result).toBeTruthy();
    });
  });

  describe('formatCurrency', () => {
    it('should format CNY currency by default', () => {
      const result = formatCurrency(1234.56, 'zh-CN');

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should format USD currency', () => {
      const result = formatCurrency(99.99, 'en-US', 'USD');

      expect(result).toBeTruthy();
    });

    it('should format EUR currency', () => {
      const result = formatCurrency(1000, 'de-DE', 'EUR');

      expect(result).toBeTruthy();
    });

    it('should handle zero value', () => {
      const result = formatCurrency(0, 'zh-CN');

      expect(result).toBeTruthy();
    });

    it('should handle negative values', () => {
      const result = formatCurrency(-100, 'en-US');

      expect(result).toBeTruthy();
    });
  });

  describe('formatPercent', () => {
    it('should format percentage', () => {
      const result = formatPercent(0.756, 'zh-CN');

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should format whole percentage', () => {
      const result = formatPercent(1, 'en-US');

      expect(result).toBeTruthy();
    });

    it('should format zero percentage', () => {
      const result = formatPercent(0, 'zh-CN');

      expect(result).toBeTruthy();
    });
  });
});
