class StockPicker
  ##
  # Implement a method #stock_picker that takes in an array of stock prices,
  # one for each hypothetical day. It should return a pair of days
  # representing the best day to buy and the best day to sell.
  # Days start at 0.
  #
  # You need to buy before you can sell.
  # Pay attention to edge cases like when the lowest day is the last day
  # or the highest day is the first day.

  def initialize
  end

  def stock_picker(arr)
    lo = arr.max()
    hi = arr[1]
    max = 0

    i = 0
    j = 1
    until i == arr.length-1 do
      lo = i < arr.index(hi) && arr[i] < lo ? arr[i] : lo
      until j == arr.length do
        hi = arr[j] > hi ? arr[j] : hi
        profit = hi - lo
        max = profit > max ? profit : max
        j += 1
      end
      i += 1
    end
    [arr.index(lo), arr.index(hi)]
  end

end
