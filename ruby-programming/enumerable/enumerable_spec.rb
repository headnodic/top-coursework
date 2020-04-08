require_relative "enumerable.rb"

RSpec.describe "Enumerable" do
  a = [1,2,3,4,5]
  h = {"foo"=>1,"bar"=>2}
  r = (1..5)

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
    it "handle blocks, return true" do
      expect(%w[ant bear cat].my_all? {|word| word.length >= 3}).to eq(true)
    end
    it "handle blocks, return false" do
      expect(%w[ant bear cat].my_all? {|word| word.length >= 4}).to eq(false)
    end
    it "handle pattern arguments" do
      expect(%w[ant bear cat].my_all?(/t/)).to eq(false)
    end
    it "handle class arguments" do
      expect([1,2i,3.14].my_all?(Numeric)).to eq(true)
    end
    it "handle nil elements" do
      expect([nil,true,99].my_all?).to eq(false)
    end
    it "handle empty collection" do
      expect([].my_all?).to eq(true)
    end
  end

end
