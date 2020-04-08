##
# Create #my_each, a method identical to #each
# Create #my_each_with_index
# Create #my_select
# Create #my_all?  # Create #my_any?
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

    if arg != nil
      if arg.class == Regexp
        loop do
          res = arg.match?(enum.next)
          if res == false
            return res
          end
        end
      elsif arg == Numeric
        loop do
          res = enum.next.is_a? Numeric
          if res == false
            return res
          end
        end
      end
    elsif block_given?
      loop do
        res = yield(enum.next)
        if res == false
          return res
        end
      end
    else
      loop do
        res = enum.next
        if res == nil
          return false
        end
      end
    end

    return true
  end

  def my_any
  end

  def my_none
  end

  def my_count
  end

  def my_map
  end

  def my_inject
  end

end
