##
# Create #my_each, a method identical to #each
# Create #my_each_with_index
# Create #my_select
# Create #my_all?
# Create #my_any?
# Create #my_none
# Create #my_count
# Create #my_map
# Create #my_inject
# Test #my_inject with a method #multiply_els
# Modify #my_map to take either a proc or a block, default to proc

module Enumerable
  def my_each
    return enum_for(:my_each) unless block_given?

    e = self.to_enum
    loop do
      yield e.next
    end
  end

  def my_each_with_index
    return enum_for(:my_each_with_index) unless block_given? 

    e = self.to_enum
    i = 0
    loop do
      yield i, e.next
      i += 1
    end
  end

  def my_select
    return enum_for(:my_select) unless block_given?

    enum = self.to_enum
    a = []
    loop do
      e = enum.next
      a << e if yield(e)
    end
    a
  end

  def my_all?(arg=nil)
    enum = self.to_enum
    res = true

    loop do
      if arg != nil && arg.class == Regexp
        res = arg.match?(enum.next)
      elsif arg != nil
        res = enum.next.is_a? arg
      elsif block_given?
        res = yield(enum.next)
      else
        res = enum.next
      end

      if res == false || res == nil
        return false
      end
    end

    return res
  end

  def my_any?(arg=nil)
    enum = self.to_enum
    res = false

    loop do
      if arg != nil && arg.class == Regexp
        res = arg.match?(enum.next)
      elsif arg != nil
        res = enum.next.is_a? arg
      elsif block_given?
        res = yield(enum.next)
      else
        res = enum.next
      end

      if res == true
        return true
      end
    end

    return res
  end

  def my_none?(arg=nil)
    enum = self.to_enum
    i = 0
    res = false

    loop do
      if arg != nil && arg.class == Regexp
        res = arg.match?(enum.next)
      elsif arg != nil
        res = enum.next.is_a? arg
      elsif block_given?
        res = yield(enum.next)
      else
        res = enum.next
      end

      if res == true
        i += 1
      end
    end

    return i == 0
  end

  def my_count(arg=nil)
    enum = self.to_enum
    count = 0
    
    if block_given?
      loop do
        if arg != nil
          res = yield(enum.next) == arg
        else
          res = yield(enum.next)
        end

        if res == true
          count += 1
        end
      end
    else
      count = self.size
    end

    return count
  end

  def my_map
  end

  def my_inject
  end

end
