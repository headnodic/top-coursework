require_relative "enumerable.rb"

def multiply_els(arr)
  arr.my_inject {|a, b| a * b}
end

RSpec.describe "Enumerable" do
  a = [1,2,3,4,5]
  h = {"foo"=>1,"bar"=>2}
  r = (1..5)
  my_proc = Proc.new {|i| i * i}

  context "#my_each" do
    it "calls the given block once for each array element" do
      expect(a.my_each {|e| e}).to eq(a.each{|e| e})
    end

    it "calls the given block once for each hash element" do
      h = {"foo"=>"bar", "bar"=>"foo"}
      expect(h.my_each {|e| e}).to eq(h.each {|e| e})
    end

    it "calls the given block once for each range element" do
      expect(r.my_each {|e| e}).to eq(r.each {|e| e})
    end

    it "returns an enumerator if no block is given" do
      expect(a.my_each.class).to eq(Enumerator)
    end
  end

  context "#my_each_with_index" do
    it "iterates the given block for each array element with an index" do
      expect(a.my_each_with_index {|e, i| e}).to eq(a.each_with_index {|e, i| e})
    end

    it "iterates the given block for each hash element with an index" do
      h = {"foo"=>"bar", "bar"=>"foo"}
      expect(h.my_each_with_index {|e, i| e}).to eq(h.each_with_index {|e, i| e})
    end

    it "iterates the given block for each range element with an index" do
      expect(r.my_each_with_index {|e, i| e}).to eq(r.each_with_index {|e, i| e})
    end
    
    it "returns an enumerator if no block is given" do
      expect(a.my_each_with_index.class).to eq(Enumerator)
    end
  end

  context "#my_select" do
    it "returns an array containing all elements that are true" do
      expect(a.my_select {|e| e.even?}).to eq(a.select {|e| e.even?})
    end

    it "returns an enumerator if no block is given" do
      expect(a.my_select.class).to eq(Enumerator)
    end
  end

  context "#my_all?" do
    it "returns true if the block is true for all elements" do
      expect(%w[ant bear cat].my_all? {|word| word.length >= 3}).to eq(true)
    end
    it "returns false if the block is false for any element" do
      expect(%w[ant bear cat].my_all? {|word| word.length >= 4}).to eq(false)
    end
    it "handles pattern arguments" do
      expect(%w[ant bear cat].my_all?(/t/)).to eq(false)
    end
    it "handles class arguments" do
      expect([1,2i,3.14].my_all?(Numeric)).to eq(true)
    end
    it "handles nil elements" do
      expect([nil,true,99].my_all?).to eq(false)
    end
    it "handles empty collections" do
      expect([].my_all?).to eq(true)
    end
  end

  context "#my_any?" do
    it "returns true if the block is true for one element" do
      expect(%w[ant bear cat].my_any? {|word| word.length >= 3}).to eq(true)
    end
    it "returns true if the block is true for one or more elements" do
      expect(%w[ant bear cat].my_any? {|word| word.length >= 4}).to eq(true)
    end
    it "handles pattern arguments" do
      expect(%w[ant bear cat].my_any?(/d/)).to eq(false)
    end
    it "handles class arguments" do
      expect([nil,true,99].my_any?(Integer)).to eq(true)
    end
    it "handles without arguments and blocks" do
      expect([nil,true,99].my_any?).to eq(true)
    end
    it "handles empty collections" do
      expect([].my_any?).to eq(false)
    end
  end

  context "#my_none?" do
    it "handles blocks, return true" do
      expect(%w[ant bear cat].my_none? {|word| word.length == 5}).to eq(true)
    end
    it "handles blocks, return false" do
      expect(%w[ant bear cat].my_none? {|word| word.length >= 4}).to eq(false)
    end
    it "handles pattern arguments" do
      expect(%w[ant bear cat].my_none?(/d/)).to eq(true)
    end
    it "handles class arguments" do
      expect([1,3.14,42].my_none?(Float)).to eq(false)
    end
    it "handles empty collection" do
      expect([].my_none?).to eq(true)
    end
    it "handles only nil element" do
      expect([nil].my_none?).to eq(true)
    end
    it "handles only nil and false elements" do
      expect([nil,false].my_none?).to eq(true)
    end
    it "handles more than nil and false elements" do
      expect([nil,false,true].my_none?).to eq(false)
    end
  end

  context "#my_count" do
    it "returns the number of items in enum through enumeration" do
      expect([1,2,4,2].my_count).to eq(4)
    end
    it "returns the number of item equal to argument, if argument given" do
      expect([1,2,4,2].count(2)).to eq(2)
    end
    it "counts the number of elements yielding a true value, if block given" do
      expect([1,2,4,2].count {|x| x%2==0}).to eq(3)
    end
  end

  context "#my_map" do
    it "returns a new array with results of running block for each element" do
      expect((1..4).my_map {|i| i*i}).to eq([1,4,9,16])
    end
    it "returns an enumerator if no block given" do
      expect((1..4).my_map.class).to eq(Enumerator)
    end
    it "handles a proc" do
      expect((1..4).my_map(my_proc)).to eq([1,4,9,16])
    end
    it "executes proc even with a block" do
      expect((1..4).my_map(my_proc) {|i| i * 3}).to eq([1,4,9,16])
    end
  end

  context "#my_inject" do
    it "combines all elements by applying binary operations from a block" do
      expect((5..10).my_inject {|sum, n| sum + n}).to eq(45)
    end
    it "combines all elements with an initial value and a block" do
      expect((5..10).my_inject(1) {|product, n| product * n}).to eq(151200)
    end
    it "combines all elements by applying binary operations from a symbol" do
      longest = %w{ cat sheep bear }.my_inject do |memo, word|
        memo.length > word.length ? memo : word
      end
      expect(longest).to eq("sheep")
    end
    it "combines all elements by applying binary operations from a method" do
      expect(multiply_els([2,4,5])).to eq(40)
    end
  end

end
