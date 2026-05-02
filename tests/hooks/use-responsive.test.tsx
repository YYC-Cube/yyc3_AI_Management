/**
 * use-responsive Hook 单元测试
 * 测试响应式设计相关的自定义 Hooks
 */

import { renderHook, act } from '@testing-library/react';
import { useMediaQuery, useResponsive, useMobile } from '@/hooks/use-responsive';

describe('use-responsive hooks', () => {
  describe('useMediaQuery', () => {
    beforeEach(() => {
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
    });

    it('should return false when media query does not match', () => {
      const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

      expect(result.current).toBe(false);
    });

    it('should return true when media query matches', () => {
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

      expect(result.current).toBe(true);
    });

    it('should update when media query changes', () => {
      let listener: ((event: MediaQueryListEvent) => void) | null = null;
      
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: (_type: string, callback: (event: MediaQueryListEvent) => void) => {
          listener = callback;
        },
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { result, rerender } = renderHook(() => useMediaQuery('(max-width: 768px)'));
      expect(result.current).toBe(false);

      act(() => {
        if (listener) {
          listener({ matches: true } as MediaQueryListEvent);
        }
      });

      expect(result.current).toBe(true);
    });
  });

  describe('useResponsive', () => {
    beforeEach(() => {
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: query.includes('768'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
    });

    it('should return responsive information object', () => {
      const { result } = renderHook(() => useResponsive());

      expect(result.current).toHaveProperty('isMobile');
      expect(result.current).toHaveProperty('isTablet');
      expect(result.current).toHaveProperty('isDesktop');
      expect(typeof result.current.isMobile).toBe('boolean');
      expect(typeof result.current.isTablet).toBe('boolean');
      expect(typeof result.current.isDesktop).toBe('boolean');
    });

    it('should detect mobile viewport', () => {
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: query.includes('640') || query.includes('768'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { result } = renderHook(() => useResponsive());

      expect(result.current.isMobile).toBe(true);
    });

    it('should detect desktop viewport', () => {
      window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { result } = renderHook(() => useResponsive());

      expect(result.current.isDesktop).toBe(true);
      expect(result.current.isMobile).toBe(false);
    });

    it('should provide breakpoint values', () => {
      const { result } = renderHook(() => useResponsive());

      expect(result.current).toHaveProperty('breakpoint');
      expect(typeof result.current.breakpoint).toBe('string');
    });

    it('should provide window dimensions', () => {
      const { result } = renderHook(() => useResponsive());

      expect(result.current).toHaveProperty('width');
      expect(result.current).toHaveProperty('height');
      expect(typeof result.current.width).toBe('number');
      expect(typeof result.current.height).toBe('number');
    });
  });

  describe('useMobile', () => {
    beforeEach(() => {
      window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
    });

    it('should return boolean for mobile detection', () => {
      const { result } = renderHook(() => useMobile());

      expect(typeof result.current).toBe('boolean');
    });

    it('should return true on mobile devices', () => {
      window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: true,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { result } = renderHook(() => useMobile());

      expect(result.current).toBe(true);
    });
  });
});
