#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
sorting.py
包含多种经典排序算法的 Python 实现。
每个算法都接受一个列表并原地排序（除非说明）。
"""

import random
import time


def bubble_sort(arr):
    """冒泡排序（原地）"""
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr


def selection_sort(arr):
    """选择排序（原地）"""
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr


def insertion_sort(arr):
    """插入排序（原地）"""
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr


def merge_sort(arr):
    """归并排序（返回新列表，非原地）"""
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return _merge(left, right)


def _merge(left, right):
    """合并两个有序列表"""
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def quick_sort(arr):
    """快速排序（原地）"""
    def _quick_sort(items, low, high):
        if low < high:
            pi = partition(items, low, high)
            _quick_sort(items, low, pi - 1)
            _quick_sort(items, pi + 1, high)

    def partition(items, low, high):
        pivot = items[high]
        i = low - 1
        for j in range(low, high):
            if items[j] <= pivot:
                i += 1
                items[i], items[j] = items[j], items[i]
        items[i + 1], items[high] = items[high], items[i + 1]
        return i + 1

    _quick_sort(arr, 0, len(arr) - 1)
    return arr


def test_sorting_algorithm(sort_func, arr):
    """测试单个排序算法，返回排序后的列表和耗时"""
    test_arr = arr.copy()
    start = time.perf_counter()
    sorted_arr = sort_func(test_arr)
    elapsed = time.perf_counter() - start
    return sorted_arr, elapsed


def main():
    """主函数：演示所有排序算法并对随机列表排序"""
    # 生成随机测试数据
    original = [random.randint(0, 100) for _ in range(10)]
    print("原始列表:", original)
    print("-" * 50)

    # 测试每个算法
    algorithms = [
        ("冒泡排序", bubble_sort),
        ("选择排序", selection_sort),
        ("插入排序", insertion_sort),
        ("归并排序", merge_sort),
        ("快速排序", quick_sort),
    ]

    for name, func in algorithms:
        result, duration = test_sorting_algorithm(func, original)
        print(f"{name:6} : {result} (耗时 {duration:.6f} 秒)")

    # 验证所有排序结果正确（升序）
    python_sorted = sorted(original)
    print("-" * 50)
    print("Python 内置排序:", python_sorted)


if __name__ == "__main__":
    main()