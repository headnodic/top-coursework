class BubbleSort
  ##
  # Build a method #bubble_sort that takes an array and returns a sorted array.
  # It must use the bubble sort methodology (without using #sort).
  # Now create a similar method called #bubble_sort_by which sorts an array
  # by accepting a block.
  # Remember to use yield inside your method definition to accomplish this.
  # The block will have two arguments taht represent the two elements of the
  # array that are currently being compared. The block's return will be
  # similar to the spaceship operator you learned about before: If the result
  # of the block execution is negative, the element on the left is "smaller"
  # than the element on the right, 0 means both elements are equal. A positive
  # result means the left element is greater. Use the block's return value to
  # sort your array.

  def initialize
  end

  def bubble_sort(arr)
    i = 0
    sorted = false
    until sorted == true do
      # last element will be largest element
      until i == arr.length-1 do
        # swap if greater
        if arr[i] > arr[i+1]
          tmp = arr[i]
          arr[i] = arr[i+1]
          arr[i+1] = tmp 
          swapped = true
          i = 0
        else
          i += 1
        end
      end
      sorted = true
    end
    arr
  end

  def bubble_sort_by(arr)
    if block_given?
      i = 0
      sorted = false
      until sorted == true do
        until i == arr.length-1 do
          if yield(arr[i], arr[i+1]) > 0
            t = arr[i]
            arr[i] = arr[i+1]
            arr[i+1] = t
            i = 0
          else
            i += 1
          end
        end
        sorted = true
      end
    else
      self.bubble_sort(arr)
    end
    arr
  end

end
